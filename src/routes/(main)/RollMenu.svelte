<script lang="ts">
	import D20Icon from './D20Icon.svelte';
	import { randomInt } from '../(lib)/utils';
	import type { Stance } from '../(lib)/models';
	import Advantage from './Advantage.svelte';
	import type { RawRoll } from '../(lib)/types';

	export let rawRolls: RawRoll[] = [];

	export let stance: Stance;

	let nDice: number = 1;

	const roll = () => {
		rawRolls.push(
			...Array(nDice)
				.fill(0)
				.map((_, i) => ({
					id: i + (rawRolls[rawRolls.length - 1]?.id ?? 0) + 1,
					result1: randomInt(20) + 1,
					result2: randomInt(20) + 1,
					bonus: Math.random()
				}))
		);

		rawRolls = rawRolls;
	};
</script>

<div class="flex flex-row relative justify-center m-2">
	<div class="flex flex-col items-center text-center">
		<div class="group w-fit">
			<button on:click={roll} class="flex flex-row space-x-1 touch-manipulation">
				{#each stance === 'neutral' ? [0] : [0, 1] as _}
					<D20Icon class="w-16 h-16 group-hover:rotate-6 group-active:scale-95" />
				{/each}
			</button>
		</div>
		<div class="select-none">Click dice to roll!</div>
		<Advantage bind:value={stance} />
	</div>

	<div class="absolute right-0">
		<div class="join join-vertical">
			{#each [1, 10, 100, 1000] as n}
				<input
					class="join-item btn md:btn-sm normal-case"
					type="radio"
					name="nDice"
					aria-label={`x${n}`}
					checked={n === 1}
					bind:group={nDice}
					value={n}
				/>
			{/each}
		</div>
	</div>
</div>
