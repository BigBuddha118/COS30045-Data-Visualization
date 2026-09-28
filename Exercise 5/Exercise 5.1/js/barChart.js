// Exercise 5.1 - Vertical bar chart with axes

const drawBarChart = data => {

  // ---- Dimensions and margins ----
  const svgWidth = 800;
  const svgHeight = 500;
  const margin = { top: 50, right: 30, bottom: 70, left: 80 };
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  // ---- Outer svg (responsive) ----
  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .style("border", "1px solid black"); // remove later if you like

  // ---- Inner chart group, shifted by the margins ----
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- Scales (ranges are relative to the innerChart) ----
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.screenType))
    .range([0, innerWidth])
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range([innerHeight, 0])   // upside down: 0 sits at the bottom
    .nice();                   // rounds the top to a tidy number (e.g. 400)

  // ---- Axes ----
  const bottomAxis = d3.axisBottom(xScale)
    .tickSize(0)                        // remove tick marks
    .tickFormat(d => d.toUpperCase());  // lcd -> LCD

  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
      .selectAll("text")
        .style("font-size", "14px");

  innerChart
    .append("g")
      .attr("class", "y-axis")
      .call(leftAxis)
      .selectAll("text")
        .style("font-size", "13px");

  // ---- Axis labels ----
  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left + 25)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Mean energy consumption (kWh/year)");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Screen technology");

  // ---- Bars ----
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.screenType))
      .attr("y", d => yScale(d.energy))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.energy));

  // ---- Value labels above the bars ----
  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.energy) - 8)
      .attr("text-anchor", "middle")
      .text(d => d.energy.toFixed(1));

};

// ---- Load, type, sort, draw ----
d3.csv("data/screen_tech_energy.csv", d => {
  return {
    screenType: d.Screen_Tech,
    energy: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {
  console.log(data);

  data.sort((a, b) => b.energy - a.energy);

  drawBarChart(data);
});