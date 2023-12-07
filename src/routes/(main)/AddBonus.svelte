<script lang="ts">
	import type { Bonus } from '../(lib)/models';
	import { createEventDispatcher } from 'svelte';
	import { availableModifiers } from '../(lib)/available-modifiers';
	import { randomInt } from '../(lib)/utils';
	import { nanoid } from 'nanoid';
	import cn from 'classnames';
	import { clickOutside } from '$lib/actions';

	let open: boolean = false;

	const dispatch = createEventDispatcher<{ addBonus: Bonus; clearBonuses: void }>();

	const chooseBonus = (modifierId: number) => {
		const bonus = {
			id: nanoid(),
			modifierId,
			reasonId: randomInt(availableModifiers[modifierId].reasons.length)
		} satisfies Bonus;

		dispatch('addBonus', bonus);
	};
</script>

<div class="flex flex-row items-center justify-center gap-2">
	<button class="btn btn-primary" on:click={() => (open = true)}>Add bonus</button>
	<button class="btn btn-error" on:click={() => dispatch('clearBonuses')}>Reset bonuses</button>
</div>

<div class={cn('dropdown dropdown-top flex flex-col items-center', { 'dropdown-open': open })}>
	<div
		use:clickOutside
		on:outclick={() => {
			open = false;
		}}
		class="dropdown-content z-[1] p-2 shadow-lg bg-base-200 rounded-box w-80"
	>
		<div class="grid grid-cols-5 gap-2">
			{#each availableModifiers as modifier, id}
				<button
					class={cn('btn btn-square w-14 h-14 border-none touch-manipulation', {
						'bg-green-200 hover:bg-green-300': modifier.positive,
						'bg-red-200 hover:bg-red-300': !modifier.positive
					})}
					on:click={() => chooseBonus(id)}
				>
					{(modifier.positive ? '+' : '-') +
						(modifier.type === 'constant'
							? `${modifier.value}`
							: `${modifier.dice.n}d${modifier.dice.sides}`)}
				</button>
			{/each}
		</div>
	</div>
</div>
