<script>
	import { getContext } from 'svelte';
	import { setLegend } from './core';

	let config = getContext('config');

	export let show = true;
	export let position = 'bottom';
	export let horizontalAlign = 'center';
	export let subtitleAlign = 'left';
	export let floating = false;
	export let offsetX = 0;
	export let offsetY = 0;

	$config = setLegend($config, {
		show: show,
		position: position,
		horizontalAlign: horizontalAlign,
		subtitleAlign: subtitleAlign,
		floating: floating,
		offsetX: offsetX,
		offsetY: offsetY
	});
</script>
