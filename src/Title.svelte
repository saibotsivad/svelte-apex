<script>
	import { getContext } from 'svelte';
	import { setTitle, setSubtitle } from './core';

	let config = getContext('config');

	export let title = '';
	export let titleAlign = 'left';
	export let subtitle = '';
	export let subtitleAlign = 'left';

	$config = setTitle($config, { text: title, align: titleAlign });
	$config = setSubtitle($config, { text: subtitle, align: subtitleAlign });
</script>
