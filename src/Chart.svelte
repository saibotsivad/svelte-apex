<script>
	import { setContext, getContext } from "svelte";
	import { writable } from "svelte/store";
	import {
		chart,
		setChart,
		setDataLabels,
		setLegend,
		setPlotOptions,
	} from "./core";

	export let type = "line";
	export let stacked = false; // true, false, "100%"
	export let zoom = false;
	export let zoomType = "x";
	export let toolbar = true;
	export let datalabel = false;
	export let horizontal = false;
	export let dropShadow = false;

	const stackType = stacked === "100%" ? "100%" : "normal";
	const isStacked = stacked === "100%" ? true : stacked;

	let config = setChart({
		type: type,
		stacked: isStacked,
		stackType: stackType,
		zoom: { enabled: zoom, type: zoomType },
		toolbar: { show: toolbar },
		dropShadow: { enabled: dropShadow, top: 12, left: 5, blur: 7 },
	});
	config = setDataLabels(config, { enabled: datalabel });
	config = setPlotOptions(config, { bar: { horizontal: horizontal } });
	config = setLegend(config, { show: false });

	let storeConfig = writable(config);
	setContext("config", storeConfig);
</script>

<slot />

<div use:chart={$storeConfig} />
