<script>
	import { getContext } from 'svelte';
	import { setGrid } from './core';

	let config = getContext('config');

	export let xLines = false;
	export let yLines = false;
	export let rowColors = undefined;
	export let rowOpacity = 1;
	export let columnColors = undefined;
	export let columnOpacity = 1;

	$config = setGrid($config, {
		xaxis: { lines: { show: xLines } },
		yaxis: { lines: { show: yLines } },
		row: { colors: rowColors, opacity: rowOpacity },
		column: { colors: columnColors, opacity: columnOpacity }
	});
</script>
