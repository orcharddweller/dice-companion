<script lang="ts">
	import Logo from '$lib/assets/dice/Logo.svelte';

	let isShareOpen = false;
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar">
			<div class="w-80 hidden md:block"></div>
			<div class="flex-1 flex flex-row justify-center items-center">
				<div class="ml-4">
					<Logo />
				</div>
				<h1 class="text-center text-3xl md:text-5xl font-bold mt-2 md:mt-4 font-serif">
					Dweller's Dice Companion
				</h1>
			</div>
			<div class="flex-none md:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</label>
			</div>
			<div class="w-80 hidden md:block">
				<ul class="flex flex-row items-center justify-end gap-4 pr-4 pt-4">
					<li>
						<a href="https://orchard.blog" class="btn btn-ghost btn-sm">Visit orchard</a>
					</li>
					<li>
						<button on:click={() => (isShareOpen = true)} class="btn btn-ghost btn-sm">Share</button
						>
					</li>
				</ul>
			</div>
		</div>
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 h-full bg-base-200 text-lg">
			<!-- Sidebar content here -->
			<li><button on:click={() => (isShareOpen = true)}>Share</button></li>
			<li>
				<a href="/">Visit orchard</a>
			</li>
		</ul>
	</div>
</div>

{#await import('../(share)/Share.svelte').then((module) => module.default) then Share}
	<Share bind:isOpen={isShareOpen} />
{/await}
