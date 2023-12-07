<script lang="ts">
	import {
		checkIfSuccess,
		getSearchParam,
		histogram,
		rawRollToRoll,
		setSearchParam
	} from './(lib)/utils';
	import {
		chanceAboveDc,
		conv,
		maxDistributions,
		minDistributions,
		normalizeDistribution,
		pmfToCdf,
		reduceBonuses
	} from './(lib)/distribution';
	import {
		StanceSchema,
		type Stance,
		TargetSchema,
		type Target,
		BonusesSchema,
		type Bonuses
	} from './(lib)/models';
	import { zipBonuses, zipStance, zipTarget } from './(lib)/zippers';
	import type { RawRoll, Tab } from './(lib)/types';
	import cn from 'classnames';
	import D20Icon from './(main)/D20Icon.svelte';
	import StatsIcon from './(components)/(icons)/StatsIcon.svelte';
	import ResultsIcon from './(components)/(icons)/ResultsIcon.svelte';
	import Results from './(results)/Results.svelte';

	let rawRolls: RawRoll[] = [];

	$: rolls = rawRolls.map((rawRoll) => rawRollToRoll(rawRoll, stance, bonusDistributionCdf));

	let target: Target = getSearchParam('t', TargetSchema, 11);

	let stance: Stance = getSearchParam('s', StanceSchema, 'neutral');

	let bonuses: Bonuses = getSearchParam('b', BonusesSchema, [], true);

	let windowWidth: number = 1000;

	$: isDesktop = windowWidth > 768;

	let currentTab: Tab = 'main';

	$: {
		setSearchParam('t', zipTarget(target), zipTarget(11));
	}
	$: {
		setSearchParam('s', zipStance(stance), zipStance('neutral'));
	}
	$: {
		setSearchParam('b', zipBonuses(bonuses), zipBonuses([]));
	}

	$: bonusDistributionPmf = normalizeDistribution(reduceBonuses(bonuses));
	$: bonusDistributionCdf = pmfToCdf(bonusDistributionPmf);

	$: d20Distribution = normalizeDistribution(
		stance === 'neutral'
			? { type: 'pmf', min: 1, values: new Array(20).fill(1) }
			: stance === 'advantage'
			? maxDistributions(
					{ type: 'pmf', min: 1, values: new Array(20).fill(1) },
					{ type: 'pmf', min: 1, values: new Array(20).fill(1) }
			  )
			: minDistributions(
					{ type: 'pmf', min: 1, values: new Array(20).fill(1) },
					{ type: 'pmf', min: 1, values: new Array(20).fill(1) }
			  )
	);

	$: distributionPmf = normalizeDistribution(conv(d20Distribution, bonusDistributionPmf));

	$: chance = chanceAboveDc(d20Distribution, bonusDistributionPmf, target);

	$: normalizedSuccessHistogram = histogram(
		rolls.filter((roll) => checkIfSuccess(roll, target)).map(({ result, bonus }) => result + bonus),
		distributionPmf.min,
		distributionPmf.min + distributionPmf.values.length
	).map((x) => x / rolls.length);

	$: normalizedFailureHistogram = histogram(
		rolls
			.filter((roll) => !checkIfSuccess(roll, target))
			.map(({ result, bonus }) => result + bonus),
		distributionPmf.min,
		distributionPmf.min + distributionPmf.values.length
	).map((x) => x / rolls.length);

	let nbCheckedRolls: number = 0;

	$: {
		if (currentTab === 'results') {
			nbCheckedRolls = rolls.length;
		}
	}

	const formatUncheckedRolls = (nbUncheckedRolls: number) =>
		nbUncheckedRolls === 0
			? null
			: nbUncheckedRolls < 1000
			? `${nbUncheckedRolls}`
			: nbUncheckedRolls < 1_000_000
			? `${Math.floor(nbUncheckedRolls / 1000)}k`
			: '∞';

	$: uncheckedRollsMessage = formatUncheckedRolls(rawRolls.length - nbCheckedRolls);
</script>

<svelte:head></svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

{#await import('./(main)/Main.svelte').then((module) => module.default) then Main}
	<div class="md:flex md:flex-row md:items-center md:justify-around">
		{#if isDesktop || currentTab === 'main'}
			<div>
				<Main {chance} bind:target bind:rawRolls bind:stance bind:bonuses {bonusDistributionPmf} />
			</div>
		{/if}

		{#if isDesktop || currentTab === 'results'}
			<div>
				<Results {rolls} {target} on:clearDice={() => (rawRolls = [])} />
			</div>
		{/if}
		{#if isDesktop || currentTab === 'stats'}
			<div class="flex-1 max-h-[calc(100vh-12rem)] overflow-auto border-b max-w-5xl">
				{#await import('./(stats)/Stats.svelte').then((module) => module.default) then Stats}
					<Stats
						{distributionPmf}
						{normalizedSuccessHistogram}
						{normalizedFailureHistogram}
						{target}
					/>
				{/await}
			</div>
		{/if}
	</div>

	{#if !isDesktop}
		<div class="h-20"></div>
		<div class="btm-nav">
			<button
				class={cn('w-full', { active: currentTab === 'main' })}
				on:click={() => (currentTab = 'main')}
			>
				<D20Icon class="w-6 h-6" />
			</button>
			<div class={cn('indicator w-full', { active: currentTab === 'results' })}>
				{#if uncheckedRollsMessage !== null}
					<span class="indicator-item badge badge-secondary">{uncheckedRollsMessage}</span>
				{/if}
				<button
					class={cn('w-full flex flex-row justify-center items-center')}
					on:click={() => (currentTab = 'results')}
				>
					<ResultsIcon />
				</button>
			</div>
			<button
				class={cn('w-full', { active: currentTab === 'stats' })}
				on:click={() => (currentTab = 'stats')}
			>
				<StatsIcon />
			</button>
		</div>
	{/if}
{/await}
