// Exercise 6 - Shared constants (used by histogram.js and, later, interactions.js)

// ---- Chart dimensions ----
const svgWidth = 800;
const svgHeight = 500;
const margin = { top: 50, right: 30, bottom: 60, left: 70 };
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;

// ---- Colours ----
const bodyBackgroundColor = "#fafafa";   // must match your page background
const barColor = "steelblue";
const barHighlightColor = "#ffb703";     // used in Exercise 6.2

// ---- Scales (created here; domain/range are set once data is loaded) ----
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// ---- Bin generator ----
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(14);