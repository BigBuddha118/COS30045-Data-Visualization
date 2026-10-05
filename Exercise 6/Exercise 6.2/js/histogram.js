// Exercise 6.1 - Histogram

const drawHistogram = data => {

  // ---- svg container ----
  const svg = d3.select("#histogram")
    .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- bins ----
  const bins = binGenerator(data);
  console.log(bins);

  // ---- set scale domains/ranges now that we know the data ----
  const binsMin = bins[0].x0;
  const binsMax = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale
    .domain([binsMin, binsMax])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  // ---- axes ----
  const bottomAxis = d3.axisBottom(xScale);
  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  innerChart
    .append("g")
      .attr("class", "y-axis")
      .call(leftAxis);

  // ---- axis labels ----
  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "middle")
      .text("Energy consumption (kWh/year)");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Number of TV models");

  // ---- bars ----
  innerChart
    .selectAll(".bar")
    .data(bins)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2);

};