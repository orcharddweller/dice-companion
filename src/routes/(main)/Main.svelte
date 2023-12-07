<script lang="ts">
	import type { Bonus, Bonuses, Stance } from '../(lib)/models';
	import type { DistributionPmf, RawRoll } from '../(lib)/types';
	import AddBonus from './AddBonus.svelte';
	import BonusesDisplay from './BonusesDisplay.svelte';
	import Chance from './Chance.svelte';
	import DifficultyClass from './DifficultyClass.svelte';
	import RollMenu from './RollMenu.svelte';
	import TotalBonus from './TotalBonus.svelte';

	export let chance: number;
	export let target: number;
	export let stance: Stance;
	export let bonuses: Bonuses;

	export let rawRolls: RawRoll[];

	export let bonusDistributionPmf: DistributionPmf;

	$: totalBonus = {
		from: bonusDistributionPmf.min,
		to: bonusDistributionPmf.min + bonusDistributionPmf.values.length - 1
	};

	const addBonus = ({ detail }: CustomEvent<Bonus>) => {
		bonuses.push(detail);
		bonuses = bonuses;
	};
</script>

<div class="min-w-[20rem] overflow-x-clip">
	<Chance {chance}></Chance>

	<DifficultyClass {target} on:change={({ detail }) => (target = detail)} />

	<RollMenu bind:rawRolls bind:stance />

	<BonusesDisplay bind:bonuses />

	<AddBonus on:addBonus={addBonus} on:clearBonuses={() => (bonuses = [])} />

	<TotalBonus {totalBonus} />
</div>
