// Exercise 5.2 - Scatter plot and line chart

const drawLineChart = data => {

  // ---- Same dimensions/margins as the bar chart so the two charts match ----
  const svgWidth = 800;
  const svgHeight = 500;
  const margin = { top: 50, right: 30, bottom: 70, left: 80 };
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  // ---- Outer svg ----
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .style("border", "1px solid black");

  // ---- Inner chart group ----
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- Scales (both continuous, so both scaleLinear) ----
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))   // [1998, 2024] in one go
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0])
    .nice();

  // ---- Axes ----
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"));   // years as integers, so no "2,000" or "2000.5"

  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
      .selectAll("text")
        .style("font-size", "13px");

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
      .text("Average spot price ($ per megawatt hour)");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Year");

  // ---- Line generator: turns each data point into x,y pixel coordinates ----
  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  // ---- Line (a <path>, as in Exercise 4.1) ----
  innerChart
    .append("path")
      .attr("class", "line")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5);

  // ---- Scatter points (drawn on top of the line) ----
  innerChart
    .selectAll(".dot")
    .data(data)
    .join("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("fill", "steelblue");

};

// ---- Load and type the data ----
d3.csv("data/ARE_Spot_Prices.csv", d => {
  return {
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {
  console.log(data);
  drawLineChart(data);
});