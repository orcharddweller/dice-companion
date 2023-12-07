<script lang="ts">
	import cn from 'classnames';
	export let value: number;
</script>

<span class={cn({ 'text-green-500': value > 0, 'text-red-500': value < 0 })}>
	{value}
</span>
