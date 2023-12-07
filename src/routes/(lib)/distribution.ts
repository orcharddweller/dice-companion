import type { DistributionCdf, DistributionPmf, Modifier } from './types';
import type { Bonus } from './models';
import { availableModifiers } from './available-modifiers';

const convCore = (
	a: DistributionPmf,
	b: DistributionPmf,
	op: (a: number, b: number) => number
): DistributionPmf => {
	// Determine the range of the resulting distribution
	const min = op(a.min, b.min);
	const max = op(a.min + a.values.length - 1, b.min + b.values.length - 1);

	// Initialize the resulting distribution
	const c: DistributionPmf = {
		type: 'pmf',
		min: min,
		values: new Array(max - min + 1).fill(0)
	};

	// Convolution
	for (let i = 0; i < a.values.length; i++) {
		for (let j = 0; j < b.values.length; j++) {
			c.values[op(i, j)] += a.values[i] * b.values[j];
		}
	}

	return c;
};

export const conv = (a: DistributionPmf, b: DistributionPmf): DistributionPmf =>
	convCore(a, b, (i, j) => i + j);

export const normalizeDistribution = (dist: DistributionPmf): DistributionPmf => {
	// Calculate the sum of the values
	const sum = dist.values.reduce((a, b) => a + b, 0);

	// Create a new distribution with normalized values
	const normalized: DistributionPmf = {
		type: 'pmf',
		min: dist.min,
		values: dist.values.map((value) => value / sum)
	};

	return normalized;
};

export const maxDistributions = (a: DistributionPmf, b: DistributionPmf): DistributionPmf =>
	convCore(a, b, (i, j) => Math.max(i, j));

export const minDistributions = (A: DistributionPmf, B: DistributionPmf): DistributionPmf =>
	convCore(A, B, (i, j) => Math.min(i, j));

export const distributionFromDiceModifier = (
	modifier: Modifier & { type: 'random' }
): DistributionPmf => {
	const { dice } = modifier;

	const distributions: DistributionPmf[] = new Array(dice.n).fill(
		modifier.positive
			? {
					min: 1,
					values: new Array(dice.sides).fill(1)
			  }
			: {
					min: -dice.sides,
					values: new Array(dice.sides).fill(1)
			  }
	);

	return distributions.reduce(conv);
};

export const reduceBonuses = (bonuses: Bonus[]): DistributionPmf =>
	bonuses.reduce(
		(current: DistributionPmf, next: Bonus) => {
			const nextModifier = availableModifiers[next.modifierId];

			if (nextModifier.type === 'constant') {
				return {
					...current,
					min: current.min + (nextModifier.positive ? 1 : -1) * nextModifier.value
				};
			}

			return normalizeDistribution(conv(current, distributionFromDiceModifier(nextModifier)));
		},
		{
			type: 'pmf',
			min: 0,
			values: [1]
		} satisfies DistributionPmf
	);

export const pmfToCdf = (pmf: DistributionPmf): DistributionCdf => {
	const cdf: DistributionCdf = {
		type: 'cdf',
		min: pmf.min,
		values: new Array(pmf.values.length).fill(0)
	};

	let sum = 0;

	for (let i = 0; i < pmf.values.length; i++) {
		sum += pmf.values[i];
		cdf.values[i] = sum;
	}

	return cdf;
};

export const chanceAboveDc = (
	d20Dist: DistributionPmf,
	bonusesDist: DistributionPmf,
	dc: number
): number => {
	const normalizedD20Dist = normalizeDistribution(d20Dist);

	const normalizedBonusesDist = normalizeDistribution(bonusesDist);

	const nonNatNormalizedD20Dist = {
		type: 'pmf',
		min: normalizedD20Dist.min + 1,
		values: normalizedD20Dist.values.slice(1, 19)
	} satisfies DistributionPmf;

	let chance = normalizedD20Dist.values[19];

	const dist = conv(nonNatNormalizedD20Dist, normalizedBonusesDist);

	// Check if the DC is within the distribution range
	if (dc >= dist.min + dist.values.length) {
		return chance;
	}

	if (dc < dist.min) {
		return 1 - normalizedD20Dist.values[0];
	}

	// Calculate the chance
	chance += dist.values.slice(dc - dist.min).reduce((a, b) => a + b, 0);

	return chance;
};
