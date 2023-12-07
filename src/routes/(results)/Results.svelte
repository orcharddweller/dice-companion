<script lang="ts">
	import type { Roll } from '../(lib)/types';
	import Overview from './Overview.svelte';
	import Rolls from './Rolls.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ clearDice: void }>();

	export let rolls: Roll[];

	export let target: number;
</script>

<div class="text-center flex flex-col items-center">
	<Overview {rolls} {target} />
	<Rolls bind:rolls {target} />
	<button class="btn btn-error mt-10" on:click={() => dispatch('clearDice')}>Reset dice</button>
</div>
