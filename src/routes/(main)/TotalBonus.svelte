<script lang="ts">
	import type { Range } from '../(lib)/types';
	import NumberDisplay from './NumberDisplay.svelte';

	export let totalBonus: Range;
</script>

<div class="flex flex-col items-center select-none m-2">
	<h2 class="text-xl font-semibold font-serif">Total Bonus</h2>
	<div class="text-lg font-medium">
		{#if totalBonus.from === totalBonus.to}
			<NumberDisplay value={totalBonus.from} />
		{:else}
			<NumberDisplay value={totalBonus.from} /> - <NumberDisplay value={totalBonus.to} />
		{/if}
	</div>
</div>
