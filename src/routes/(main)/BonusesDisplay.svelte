<script lang="ts">
	import { flip } from 'svelte/animate';
	import BonusDisplay from './BonusDisplay.svelte';
	import { fade } from 'svelte/transition';
	import type { Bonuses } from '../(lib)/models';
	import cn from 'classnames';

	export let bonuses: Bonuses;
</script>

<div
	class={cn('flex flex-row gap-4 min-h-[8rem] p-4 w-[22rem] overflow-auto items-center', {
		'justify-center': bonuses.length <= 2
	})}
>
	{#each bonuses as bonus, i (bonus.id)}
		<div animate:flip={{ duration: 200 }} in:fade>
			<BonusDisplay
				{bonus}
				on:close={() => {
					bonuses.splice(i, 1);
					bonuses = bonuses;
				}}
			/>
		</div>
	{/each}
	{#if bonuses.length === 0}
		<div class="flex flex-col items-center select-none">
			<h2>No bonuses.</h2>
			<p class="text-center">Add a bonus by clicking the button below.</p>
		</div>
	{/if}
</div>
