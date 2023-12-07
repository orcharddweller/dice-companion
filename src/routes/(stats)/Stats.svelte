<script lang="ts">
	import Logo from '$lib/assets/dweller/Logo.svelte';
	import type { DistributionPmf } from '../(lib)/types';
	import DistributionPlot from './DistributionPlot.svelte';
	import Learn from './Learn.svx';
	import cn from 'classnames';

	export let distributionPmf: DistributionPmf;
	export let normalizedSuccessHistogram: number[];
	export let normalizedFailureHistogram: number[];
	export let target: number;
</script>

<h2 class="text-center text-5xl font-serif">Statistics</h2>
<div class="m-6">
	<DistributionPlot
		{distributionPmf}
		{normalizedSuccessHistogram}
		{normalizedFailureHistogram}
		{target}
	/>
</div>

<h2 class="text-center text-4xl font-serif">Instructions</h2>
<div class="flex flex-col 2xl:flex-row items-center">
	<div class="prose m-6">
		<Learn />
	</div>
	<div class="group w-fit mx-auto">
		<div
			class={cn(
				'mx-auto mt-6 rounded-full transition ease-in-out duration-300 group-hover:bg-secondary',
				'active:bg-secondary-focus group-hover:scale-105 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex flex-row items-center justify-center'
			)}
		>
			<a href="https://youtube.com/@orcharddweller">
				<Logo class="w-[260px] h-[260px] md:w-[350px] md:h-[350px]" />
			</a>
		</div>
		<div class="mt-4 font-serif font-bold text-center invisible group-hover:visible">
			<a href="https://youtube.com/@orcharddweller">Visit the YouTube channel</a>
		</div>
	</div>
</div>
