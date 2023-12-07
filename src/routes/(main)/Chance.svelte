<script lang="ts">
	export let chance: number;
	let color: string;

	// Define your colors here as RGB
	const low = [220, 38, 38]; // Red-500 in RGB
	const mid = [0, 0, 0]; // Yellow-500 in RGB
	const high = [19, 202, 39]; // Green-500 in RGB

	$: {
		if (chance <= 0.5) {
			const percent = chance * 2;
			color = `rgba(${low[0] * (1 - percent) + mid[0] * percent}, ${
				low[1] * (1 - percent) + mid[1] * percent
			}, ${low[2] * (1 - percent) + mid[2] * percent}, 1)`;
		} else {
			const percent = (chance - 0.5) * 2;
			color = `rgba(${mid[0] * (1 - percent) + high[0] * percent}, ${
				mid[1] * (1 - percent) + high[1] * percent
			}, ${mid[2] * (1 - percent) + high[2] * percent}, 1)`;
		}
	}
</script>

<div class="text-center select-none flex flex-col items-center" style="color: {color};">
	<span class="text-5xl font-bold"> {(chance * 100).toFixed(2)}%</span>
</div>
