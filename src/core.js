import * as R from 'ramda'
import ApexCharts from "apexcharts"

const appendList = (path, chart, element) => R.assocPath(path.split('.'), R.append(element, R.pathOr([], path.split('.'), chart)), chart)
const replaceInListById = (path, chart, element, id) => {
  const listInterest = R.path(path.split('.'), chart)
  const index = R.findIndex(el => el.id == id, listInterest)
  if (index===-1){return appendList(path, chart, R.assoc("id", id, element))}
  else {return R.assocPath(path.split('.'), R.update(index, element, listInterest), chart)}
}
const placeList = (path, chart, element, id=null) => id===null?appendList(path, chart, element):replaceInListById(path, chart, element, id)
const completeKey = (path, chart, element) => R.mergeDeepRight(chart, R.assocPath(path.split('.'), element, {}))

const setChart = (element) => {
  return { chart: element };
};
const setXAxis = R.curry(completeKey)('xaxis');
const setTitle = R.curry(completeKey)('title');
const setSubtitle = R.curry(completeKey)('subtitle');
const setTooltip = R.curry(completeKey)('tooltip');
const setLabels = R.curry(completeKey)('labels');
const setLegend = R.curry(completeKey)('legend');
const setStroke = R.curry(completeKey)('stroke');
const setFill = R.curry(completeKey)('fill');
const setTheme = R.curry(completeKey)('theme');
const setNoData = R.curry(completeKey)('noData');
const setStates = R.curry(completeKey)('states');
const setMarkers = R.curry(completeKey)('markers');
const setDataLabels = R.curry(completeKey)('dataLabels');
const setGrid = R.curry(completeKey)('grid');
const setPlotOptions = R.curry(completeKey)('plotOptions');
const setForecastDataPoints = R.curry(completeKey)('forecastDataPoints');
const setColors = R.curry(completeKey)('colors');

const setSeries = R.curry(placeList)('series');
const setYAxis = R.curry(placeList)('yaxis');
const setAnnotationsYAxis = R.curry(placeList)('annotations.yaxis');
const setAnnotationsXAxis = R.curry(placeList)('annotations.xaxis');
const setAnnotationsPoints = R.curry(placeList)('annotations.points');
const setResponsive = R.curry(placeList)('responsive');


// All credits to https://github.com/galkatz373
window.ApexCharts = ApexCharts;

const chart = (node, options) => {
  let myChart = new ApexCharts(node, options)
  myChart.render()

  return {
    update(options) {
      myChart.updateOptions(options)
    },
    destroy() {
      myChart.destroy()
    }
  }
}


export {chart, setChart, setXAxis, setTitle, setSubtitle, setTooltip, setLabels, setLegend, setStroke, setFill, setTheme, setNoData, setStates, setMarkers, setDataLabels,
  setGrid, setPlotOptions, setForecastDataPoints, setSeries, setYAxis, setAnnotationsPoints, setAnnotationsYAxis, setAnnotationsXAxis, setColors, setResponsive}