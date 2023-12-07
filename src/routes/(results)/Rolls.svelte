<script lang="ts">
	import { tick } from 'svelte';
	import type { Roll } from '../(lib)/types';
	import DiceIcon from './DiceIcon.svelte';
	import cn from 'classnames';

	export let rolls: Roll[];
	export let target: number;

	let itemHeight = 64;
	let itemWidth = 64;
	let columns = 5;

	let container: HTMLDivElement;
	let startRow = 0;
	let visibleRows = 7;

	let lastMaxId = 0;

	const updateScroll = async () => {
		await tick();

		container.scrollTo({
			top: container.scrollHeight,
			behavior: 'smooth'
		});
	};

	$: {
		if (rolls.length > 0) {
			const newMaxId = rolls[rolls.length - 1].id;

			if (newMaxId > lastMaxId) {
				lastMaxId = newMaxId;

				updateScroll();
			}
		} else {
			lastMaxId = 0;
		}
	}

	const handleScroll = () => {
		startRow = Math.floor(container.scrollTop / itemHeight);
	};
</script>

<div
	bind:this={container}
	on:scroll={handleScroll}
	class="overflow-auto h-[256px] w-[344px] py-2 ml-[24px]"
>
	{#if rolls.length === 0}
		<div
			class={cn(
				'flex flex-col text-center items-center h-full justify-center',
				'text-lg select-none'
			)}
		>
			<span>No dice yet...</span>
			<span>Start rolling!</span>
		</div>
	{:else}
		<div style="position: relative; height: {(rolls.length / columns) * itemHeight}px;">
			{#each rolls.slice(startRow * columns, (startRow + visibleRows) * columns) as item, index (item.id)}
				<div
					style="position: absolute; height: {itemHeight}px; width: {itemWidth}px; top: {(startRow +
						Math.floor(index / columns)) *
						itemHeight}px; left: {(index % columns) * itemWidth}px;"
				>
					<DiceIcon value={item.result} isSuccess={item.result + item.bonus >= target} />
				</div>
			{/each}
		</div>
	{/if}
</div>
