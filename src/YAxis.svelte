<script>
	import { getContext } from 'svelte';
	import { setYAxis } from './core';

	let config = getContext('config');

	export let opposite = false;
	export let reversed = false;
	export let logBase = undefined;
	export let min = undefined;
	export let max = undefined;
	export let title = undefined;
	export let color = '#000';
	export let axisBorder = false;

	const logarithmic = logBase ? true : false;

	$config = setYAxis($config, {
		opposite: opposite,
		reversed: reversed,
		logBase: logBase,
		logarithmic: logarithmic,
		min: min,
		max: max,
		title: { text: title, style: { color: color } },
		axisBorder: { show: axisBorder }
	});
</script>
