import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

export default {
	input: [
		'src/Annotation.svelte',
		'src/Chart.svelte',
		'src/Grid.svelte',
		'src/Legend.svelte',
		'src/PlotOptions.svelte',
		'src/Series.svelte',
		'src/Title.svelte',
		'src/Tooltip.svelte',
		'src/Xaxis.svelte',
		'src/YAxis.svelte',
	],
	output: [
		{ file: pkg.module, 'format': 'en' },
		{ file: pkg.main, 'format': 'umd', name: 'SvelteApex' }
	],
	plugins: [
		svelte(),
		resolve()
	],
};
