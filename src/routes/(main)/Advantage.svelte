<script lang="ts">
	import type { Stance } from '../(lib)/models';
	import cn from 'classnames';

	export let value: Stance = 'neutral';
</script>

<div class="m-4">
	<div class="join">
		{#each ['disadvantage', 'neutral', 'advantage'] as stance}
			<input
				class={cn([
					'join-item',
					'touch-manipulation',
					'radio radio-lg md:radio-md',
					{
						'checked:bg-error': stance === 'disadvantage',
						'checked:bg-success': stance === 'advantage'
					}
				])}
				type="radio"
				bind:group={value}
				value={stance}
			/>
		{/each}
	</div>
	<div class="flex flex-col items-center">
		<div class="text-center w-full text-sm select-none">
			{value === 'advantage' ? 'Advantage' : value === 'disadvantage' ? 'Disadvantage' : 'Neutral'}
		</div>
	</div>
</div>
