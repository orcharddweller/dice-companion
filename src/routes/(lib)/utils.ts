import type { z } from 'zod';
import type { DistributionCdf, DistributionPmf, Range, RawRoll, Roll } from './types';
import { browser } from '$app/environment';
import lzString from 'lz-string';
import type { Stance } from './models';

export const dk = (k: number) => Math.min(Math.floor(Math.random() * k) + 1, k);

export const randomInt = (n: number) => Math.min(Math.floor(Math.random() * n), n - 1);

export const randomChoice = <T>(choices: T[]): T => choices[randomInt(choices.length)];

export const randomFromDistributionTransform = (
	value: number,
	distribution: DistributionCdf
): number => distribution.min + distribution.values.findIndex((d) => value < d);

export const updateSearchParam = (key: string, value: string) => {
	if (!browser) {
		return;
	}

	const url = new URL(window.location.toString());

	url.searchParams.set(key, value);

	history.replaceState({}, '', url);
};

export const deleteSearchParam = (key: string) => {
	if (!browser) {
		return;
	}

	const url = new URL(window.location.toString());

	url.searchParams.delete(key);

	history.replaceState({}, '', url);
};

export const setSearchParam = (key: string, value: string, defaultValue: string) => {
	if (value === defaultValue) {
		deleteSearchParam(key);
		return;
	}

	updateSearchParam(key, value);
};

export const getSearchParam = <T extends z.ZodTypeAny>(
	key: string,
	schema: T,
	defaultValue?: z.infer<T>,
	parseJson = false
): z.infer<T> => {
	if (!browser) {
		return defaultValue;
	}

	const url = new URL(window.location.toString());

	const raw = url.searchParams.get(key);

	if (raw === null) {
		return defaultValue;
	}

	const value = parseJson ? JSON.parse(lzString.decompressFromEncodedURIComponent(raw)) : raw;

	const parsed = schema.safeParse(value);

	if (parsed.success) {
		return parsed.data;
	}

	if (defaultValue !== undefined) {
		return defaultValue;
	}

	throw parsed.error;
};

export const histogram = (values: number[], min: number, max: number) => {
	const buckets = new Array(max - min + 1).fill(0);

	for (const value of values) {
		buckets[value - min]++;
	}

	return buckets;
};

export const normalize = (values: number[]) => {
	const sum = values.reduce((a, b) => a + b, 0);

	return values.map((value) => value / sum);
};

export const rawRollToRoll = (
	rawRoll: RawRoll,
	stance: Stance,
	bonusDistributionCdf: DistributionCdf
): Roll => ({
	id: rawRoll.id,
	result:
		stance === 'advantage'
			? Math.max(rawRoll.result1, rawRoll.result2)
			: stance === 'disadvantage'
			? Math.min(rawRoll.result1, rawRoll.result2)
			: rawRoll.result1,
	bonus: randomFromDistributionTransform(rawRoll.bonus, bonusDistributionCdf)
});

export const checkIfSuccess = (roll: Roll, dc: number): boolean =>
	(roll.result === 20 || roll.result + roll.bonus >= dc) && roll.result !== 1;
