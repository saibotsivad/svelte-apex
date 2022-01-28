<script>
	import { getContext } from 'svelte';
	import { setTooltip } from './core';

	let config = getContext('config');

	export let enabled = true;
	export let shared = true;
	export let intersect = false;

	$config = setTooltip($config, { enabled: enabled, shared: shared, intersect: intersect });
</script>
