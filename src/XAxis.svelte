<script>
	import { getContext } from 'svelte';
	import { setXAxis } from './core';

	let config = getContext('config');

	export let type = 'category';
	export let categories = [];
	export let min = undefined;
	export let max = undefined;
	export let position = 'bottom';
	export let title = undefined;
	export let tickAmount = undefined;

	$config = setXAxis($config, {
		type: type,
		categories: categories,
		min: min,
		max: max,
		position: position,
		tickAmount: tickAmount,
		title: { text: title }
	});
</script>
