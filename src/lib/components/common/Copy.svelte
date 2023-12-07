<script lang="ts">
	import CopyIcon from './CopyIcon.svelte';
	import CopiedIcon from './CopiedIcon.svelte';

	export let text: string;

	let className = '';

	export { className as class };

	export let showCopiedFor = 2000;

	let copied = false;
</script>

<button
	class={className}
	on:click={() => {
		navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), showCopiedFor);
	}}
>
	{#if copied}
		<slot name="copiedIcon">
			<CopiedIcon />
		</slot>
		<slot name="copied" />
	{:else}
		<slot name="copyIcon">
			<CopyIcon />
		</slot>
		<slot name="copy" />
	{/if}
	<slot />
</button>
