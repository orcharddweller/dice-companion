<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let target: number;

	let dispatch = createEventDispatcher<{ change: number }>();

	let value: number;

	$: value = target;

	$: {
		if (value !== null) {
			dispatch('change', value);
		}
	}
</script>

<div class="flex flex-col items-center m-4 text-center select-none">
	<h2 class="font-bold text-xl mb-2 font-serif">Difficulty Class</h2>
	<input
		class="input input-primary w-20 text-xl font-bold"
		on:blur={() => (value = target)}
		bind:value
		type="number"
		placeholder="Type here"
	/>
</div>
