<script lang="ts">
	import type { Roll } from '../(lib)/types';
	import { checkIfSuccess } from '../(lib)/utils';

	export let target: number;
	export let rolls: Roll[];

	$: nbRolls = rolls.length;

	$: nbSuccesses = rolls.filter((roll) => checkIfSuccess(roll, target)).length;

	$: nbFailures = nbRolls - nbSuccesses;
</script>

<div class="flex flex-col mx-4 my-2 items-center text-2xl w-full">
	<div class="text-4xl mb-6">
		<div class="font-serif text-base-content">Rolled</div>
		<div class="text-slate-600 font-extrabold">{nbRolls}</div>
	</div>

	<div class="flex flex-row justify-evenly w-full mb-4 h-20">
		<div class="w-24">
			<div class="font-serif">Succeded</div>
			<div class="font-extrabold text-success">{nbSuccesses}</div>
			<div class="text-sm text-success">
				{#if nbRolls > 0}
					{((nbSuccesses / nbRolls) * 100).toFixed(2)}%
				{/if}
			</div>
		</div>

		<div class="w-24">
			<div class="font-serif">Failed</div>
			<div class="font-extrabold text-error">{nbFailures}</div>
			<div class="text-sm text-error">
				{#if nbRolls > 0}
					{((nbFailures / nbRolls) * 100).toFixed(2)}%
				{/if}
			</div>
		</div>
	</div>
</div>
