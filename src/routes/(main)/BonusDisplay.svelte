<script lang="ts">
	import { availableModifiers } from '../(lib)/available-modifiers';
	import type { Bonus } from '../(lib)/models';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let bonus: Bonus;

	$: modifier = availableModifiers[bonus.modifierId];
	$: reason = modifier.reasons[bonus.reasonId];
</script>

<div class="border p-2 text-center w-40 select-none">
	<div>
		{#if modifier.type === 'constant'}
			{modifier.positive ? '+' : '-'}{modifier.value}
		{:else if modifier.type === 'random'}
			{modifier.positive ? '+' : '-'}{modifier.dice.n}d{modifier.dice.sides}
		{/if}
	</div>
	<div>{reason}</div>
	<button class=" btn btn-xs btn-square" on:click={() => dispatch('close')}>x</button>
</div>
