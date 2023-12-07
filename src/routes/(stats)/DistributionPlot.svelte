<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import type { DistributionPmf } from '../(lib)/types';
	import type { Action } from 'svelte/action';

	export let normalizedSuccessHistogram: number[];
	export let normalizedFailureHistogram: number[];
	export let distributionPmf: DistributionPmf;
	export let target: number;

	Chart.register(...registerables);

	const chart: Action<
		HTMLCanvasElement,
		{
			distributionPmf: DistributionPmf;
			successHistogram: number[];
			failureHistogram: number[];
			target: number;
		}
	> = (node, { distributionPmf, successHistogram, failureHistogram, target }) => {
		const newChart = new Chart(node, {
			data: {
				labels: distributionPmf.values.map((_, i) => i + distributionPmf.min),
				datasets: [
					{
						label: 'Distribution',
						type: 'line' as const,
						data: distributionPmf.values,
						fill: true
					},
					{
						label: 'Success',
						type: 'bar' as const,
						data: successHistogram,
						backgroundColor: '#22c55e'
					},
					{
						label: 'Failure',
						type: 'bar' as const,
						data: failureHistogram,
						backgroundColor: '#ef4444'
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						mode: 'index',
						callbacks: {
							title: (context) => {
								const roll = context[0].dataIndex + distributionPmf.min;

								return `Total: ${roll}`;
							},
							label: (context) => {
								if (isNaN(context.raw as number)) {
									return `No rolls`;
								}

								if (context.datasetIndex === 1) {
									return `Actual successes: ${((context.raw as number) * 100).toFixed(2)}%`;
								}

								if (context.datasetIndex === 2) {
									return `Actual failures: ${((context.raw as number) * 100).toFixed(2)}%`;
								}

								return `Probability: ${((context.raw as number) * 100).toFixed(2)}%`;
							}
						}
					}
				},
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true
					}
				}
			}
		});

		const resize = () => {
			newChart.resize();
		};

		window.addEventListener('resize', resize);

		return {
			update: ({ distributionPmf, successHistogram, failureHistogram, target }) => {
				newChart.data.labels = distributionPmf.values.map((_, i) => i + distributionPmf.min);
				newChart.data.datasets[0].data = distributionPmf.values;
				newChart.data.datasets[1].data = successHistogram;
				newChart.data.datasets[2].data = failureHistogram;
				newChart.update();
			},
			destroy: () => {
				window.removeEventListener('resize', resize);
				newChart.destroy();
			}
		};
	};
</script>

<main class="main-container">
	<section>
		<canvas
			use:chart={{
				successHistogram: normalizedSuccessHistogram,
				failureHistogram: normalizedFailureHistogram,
				distributionPmf,
				target
			}}
		/>
	</section>
</main>
