<script>
	import { getContext } from 'svelte';
	import { setPlotOptions } from './core';
	import * as R from 'ramda';

	let config = getContext('config');

	export let areaFillTo = undefined; // 'origin' or 'end'
	export let barBorderRadius = undefined;
	export let barColorRange = [0, 0, undefined]; // [start, stop, color]
	export let barColumnWidth = '80%';
	export let barRangeBarGroupRows = false;

	const currentFillTo = R.pathOr('origin', ['plotOptions', 'area', 'fillTo'], $config);
	areaFillTo = areaFillTo === undefined ? currentFillTo : areaFillTo;

	const currentBorderRadius = R.pathOr(0, ['plotOptions', 'bar', 'borderRadius'], $config);
	barBorderRadius = barBorderRadius === undefined ? currentBorderRadius : barBorderRadius;

	const currentColumnWidth = R.pathOr('70%', ['plotOptions', 'bar', 'borderRadius'], $config);
	barColumnWidth = barColumnWidth === undefined ? currentColumnWidth : barColumnWidth;

	const newBarColorRange =
		R.path(['plotOptions', 'bar', 'colors', 'ranges'], $config) === undefined
			? [{ from: barColorRange[0], to: barColorRange[1], color: barColorRange[2] }]
			: R.append(
					{ from: barColorRange[0], to: barColorRange[1], color: barColorRange[2] },
					$config.plotOptions.bar.colors.ranges
			  );

	console.log(newBarColorRange);
	$config = setPlotOptions($config, {
		area: { fillTo: areaFillTo },
		bar: {
			borderRadius: barBorderRadius,
			columnWidth: barColumnWidth,
			colors: { ranges: newBarColorRange },
			rangeBarGroupRows: barRangeBarGroupRows
		}
	});
</script>
