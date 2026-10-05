// Exercise 6.3 - Scatterplot

const drawScatterplot = data => {

  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  innerChartS = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- Scales ----
  const maxStar = d3.max(data, d => d.starRating);
  const maxEnergy = d3.max(data, d => d.energyConsumption);

  xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth])
    .nice();

  yScaleS
    .domain([0, maxEnergy])
    .range([innerHeight, 0])
    .nice();

  // ---- Circles ----
  innerChartS
    .selectAll(".dot")
    .data(data)
    .join("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", d => xScaleS(d.starRating))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.5);

  // ---- Axes ----
  const bottomAxis = d3.axisBottom(xScaleS);
  const leftAxis = d3.axisLeft(yScaleS);

  innerChartS
    .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  innerChartS
    .append("g")
      .attr("class", "y-axis")
      .call(leftAxis);

  // ---- Axis labels ----
  innerChartS
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "middle")
      .text("Star rating");

  innerChartS
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Energy consumption (kWh/year)");

  // ---- Legend (top-right corner of the chart) ----
  const legend = innerChartS
    .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${innerWidth - 90}, 10)`);

  const legendItems = legend
    .selectAll(".legend-item")
    .data(colorScale.domain())
    .join("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legendItems
    .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => colorScale(d));

  legendItems
    .append("text")
      .attr("x", 18)
      .attr("y", 10)
      .style("font-size", "12px")
      .text(d => d.toUpperCase());

};