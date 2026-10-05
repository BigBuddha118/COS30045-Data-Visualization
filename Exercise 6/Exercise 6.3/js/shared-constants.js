// Exercise 6 - Shared constants (used by histogram.js and interactions.js)

// ---- Chart dimensions ----
const svgWidth = 800;
const svgHeight = 500;
const margin = { top: 50, right: 30, bottom: 60, left: 70 };
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;

// ---- Colours ----
const bodyBackgroundColor = "#fafafa";
const barColor = "steelblue";
const barHighlightColor = "#ffb703";

// ---- Scales ----
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// ---- Bin generator ----
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(14);

// ---- Shared chart element (assigned in histogram.js, updated from interactions.js) ----
let innerChart;

// ---- Filters ----
const filters = [
  { id: "all",  label: "All",  isActive: true },
  { id: "lcd",  label: "LCD",  isActive: false },
  { id: "led",  label: "LED",  isActive: false },
  { id: "oled", label: "OLED", isActive: false }
];

// ---- Scatterplot shared elements ----
let innerChartS;
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

// ---- Tooltip (used in Exercise 6.4) ----
const tooltipWidth = 150;
const tooltipHeight = 50;

// ---- Colour scale for screen type ----
const colorScale = d3.scaleOrdinal()
  .domain(["lcd", "led", "oled"])
  .range(d3.schemeSet2);