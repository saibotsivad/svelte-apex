<script>
	import { getContext } from 'svelte';
	import * as R from 'ramda';
	import { setSeries, setColors, setStroke, setMarkers, setFill, setLabels } from './core';

	let config = getContext('config');

	export let type = undefined;
	export let y = [];
	export let x = undefined;
	export let name = 'data';
	export let size = undefined; // markersize
	export let curve = 'smooth';
	export let width = undefined;
	export let dashed = 0;
	export let shape = 'circle';
	export let color = null;
	export let fillOpacity = undefined;
	export let fillType = 'solid';
	export let fillColor = undefined;

	// possible bug if you have more than 5 series and you specify a color
	const colorsTheme = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];
	const configColors = $config.colors ? $config.colors : colorsTheme;
	const indexOfThisSerie = $config.series ? $config.series.length : 0;
	const colorsList = color ? R.insert(indexOfThisSerie, color, configColors) : configColors;

	// default value for `type` depending on the type of chart
	type = type === undefined && $config.chart.type == 'bar' ? 'column' : type;
	type = type === undefined && $config.chart.type == 'area' ? 'area' : type;
	type = type === undefined && $config.chart.type == 'line' ? 'line' : type;
	type = type === undefined && $config.chart.type == 'candlestick' ? 'candlestick' : type;
	type = type === undefined && $config.chart.type == 'boxPlot' ? 'boxPlot' : type;

	width = width === undefined && $config.chart.type == 'bar' ? 0 : width;
	width = width === undefined && $config.chart.type == 'rangeBar' ? 0 : width;
	width = width === undefined && $config.chart.type == 'candlestick' ? 1 : width;
	width = width === undefined ? 3 : width;

	size = size === undefined && type === 'scatter' ? 4 : size;
	size = size === undefined ? 0 : size;

	fillOpacity = fillOpacity === undefined && ['pie', 'donut'].includes($config.chart.type) ? 1.0 : fillOpacity;
	fillOpacity = fillOpacity === undefined && $config.chart.type == 'radar' ? 0.2 : fillOpacity;
	fillOpacity = fillOpacity === undefined ? 0.9 : fillOpacity;

	size = $config.markers ? R.append(size, $config.markers.size) : [size];
	// size is behaving weirdly, appenning two values instead of one ... dunno why
	curve = $config.stroke ? R.append(curve, $config.stroke.curve) : [curve];
	width = $config.stroke ? R.append(width, $config.stroke.width) : [width];
	dashed = $config.stroke ? R.append(dashed, $config.stroke.dashArray) : [dashed];
	shape = $config.markers ? R.append(shape, $config.markers.shape) : [shape];
	fillOpacity = $config.fill ? R.append(fillOpacity, $config.fill.opacity) : [fillOpacity];
	fillType = $config.fill ? R.append(fillType, $config.fill.type) : [fillType];
	fillColor = $config.fill ? R.append(fillColor, $config.fill.color) : [fillColor];

	const data = x
		? R.zipWith(
			(x, y) => {
				return { x: x, y: y };
			},
			x,
			y,
		  )
		: y;
	if (['pie', 'donut'].includes($config.chart.type)) {
		$config.series = y;
		$config = setLabels($config, x);
		$config.fill = { opacity: fillOpacity[0], type: fillType[0], color: fillColor[0] };
	} else {
		$config = setSeries($config, { data: data, name: name, type: type });
		$config = setColors($config, colorsList);
		$config = setStroke($config, { curve: curve, width: width, dashArray: dashed });
		$config = setMarkers($config, { size: size, shape: shape });
		$config = setFill($config, { opacity: fillOpacity, type: fillType, color: fillColor });
	}

	// // for Bar plots
	// $config = datalabel
	// 	? setPlotOptions($config, { bar: { dataLabels: { position: 'top' } } })
	// 	: $config;
</script>
