<script lang="ts">
	import cn from 'classnames';
	import { clickOutside } from '$lib/actions';
	import TwitterIcon from '$lib/assets/icons/TwitterIcon.svelte';
	import Copy from '$lib/components/common/Copy.svelte';
	import { DWELLERS_TWITTER_HANDLE } from '$lib/constants';
	import { generateMessage } from './generate-message';

	export let isOpen: boolean = false;

	let shareCustom: boolean = false;

	let url: string;
	let isConfigDefault: boolean;
	let shareMessage: string;

	$: {
		isOpen; // hack to reload the url when the dialog opens

		const baseUrl = window.location.origin + window.location.pathname;
		const urlWithConfig = window.location.toString();

		url = shareCustom ? urlWithConfig : baseUrl;

		isConfigDefault = urlWithConfig === baseUrl;

		shareMessage = generateMessage();
	}

	let twitterUrl: URL;

	$: {
		if (url) {
			twitterUrl = new URL('https://twitter.com/intent/tweet');
			twitterUrl.searchParams.set('text', shareMessage);
			twitterUrl.searchParams.set('url', url);
			twitterUrl.searchParams.set('via', DWELLERS_TWITTER_HANDLE);
		}
	}
</script>

<dialog class={cn('modal', { 'modal-open': isOpen })}>
	<form method="dialog" class="modal-box" use:clickOutside on:outclick={() => (isOpen = false)}>
		<h3 class="font-bold text-2xl select-none">Share Dweller's Dice Companion</h3>
		{#if !isConfigDefault}
			<div class="h-12 flex flex-col justify-center">
				<label class={cn('label cursor-pointer')}>
					<span>Include my config (DC, advantage, and bonuses)</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={shareCustom} />
				</label>
			</div>
		{/if}

		<div class="m-2 text-sm">Click on the link or use buttons bellow:</div>
		<div
			class={cn(
				'break-words h-24 text-center border rounded m-2 p-4 overflow-auto',
				'flex flex-col justify-center select-all'
			)}
		>
			<span>
				{url}
			</span>
		</div>
		<div class="flex flex-row gap-2 justify-center">
			<Copy text={url} class="btn btn-square" />
			<a class="btn btn-square twitter-share-button" href={twitterUrl.toString()}>
				<TwitterIcon /></a
			>
		</div>
	</form>
</dialog>
