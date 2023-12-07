<script lang="ts">
	import cn from 'classnames';

	export let value: number;
	export let isSuccess: boolean;
</script>

<svg
	class={cn('w-16 h-16 select-none', {
		'fill-green-200': isSuccess,
		'fill-red-200': !isSuccess
	})}
	x="0px"
	y="0px"
	viewBox="200 0 500 500"
	style="enable-background:new 0 0 960 560;"
>
	<style type="text/css">
		.st0 {
			display: none;
		}
		.st1 {
			stroke: #000000;
			stroke-width: 10;
			stroke-miterlimit: 10;
		}
	</style>
	<path
		id="XMLID_14_"
		class="st1"
		d="M289.4,180.3l181.7-104c0.1-0.1,0.2-0.1,0.3,0l181.4,105.5c0.2,0.1,0.3,0.3,0.3,0.5l-0.7,209.4
		c0,0.2-0.1,0.3-0.2,0.4L470.4,496c-0.3,0.2-0.8,0.2-1.1,0L288.8,391.3c-0.6-0.3-0.9-0.9-0.9-1.5l0.6-208
		C288.6,181.1,288.9,180.6,289.4,180.3z"
	/>
	<path
		id="XMLID_3_"
		class="st1"
		d="M469.9,496.3L598,357.5l53.8,34c0.3,0.2,0.3,0.6,0,0.8L470.7,495.9c-0.5,0.3-1,0.2-1.4-0.2
		L345,357l126.5-225.7L598,357.5L345,357l-57.1,33.8L345,357l-55.9-174.6c-0.3-0.9,0.2-1.9,1.1-2.1l181.2-49L597.1,356
		c0.3,0.6,1.2,0.5,1.4-0.1L653.1,182c0-0.1,0-0.2-0.1-0.2l-181.5-50.5l-0.2-55.5"
	/>
	<text class="font-bold fill-black" font-size="96px" x="470" y="330" text-anchor="middle"
		>{value}</text
	>
</svg>
