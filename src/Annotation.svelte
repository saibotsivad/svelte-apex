<script>
	import { getContext } from 'svelte';
	import { setAnnotationsPoints, setAnnotationsYAxis, setAnnotationsXAxis } from './core';

	let config = getContext('config');

	export let y = undefined;
	export let x = undefined;
	export let text = 'annotation';
	export let color = undefined;

	console.log($config);

	let func =
		x === undefined
			? y === undefined
				? 1
				: setAnnotationsYAxis
			: y === undefined
			? setAnnotationsXAxis
			: setAnnotationsPoints;

	$config = func($config, {
		x: Array.isArray(x) ? x[0] : x,
		y: Array.isArray(y) ? y[0] : y,
		x2: Array.isArray(x) ? x[1] : undefined,
		y2: Array.isArray(y) ? y[1] : undefined,
		borderColor: color,
		fillColor: color,
		label: { text: text, borderColor: color, style: { background: color, color: '#fff' } }
	});
</script>
