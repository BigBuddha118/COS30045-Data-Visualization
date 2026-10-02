// Exercise 5.3 - Donut chart

const drawDonutChart = data => {

  // ---- Dimensions: the circle is sized from the shortest side, not margins ----
  const svgWidth = 800;
  const svgHeight = 500;
  const padding = 40;
  const radius = Math.min(svgWidth, svgHeight) / 2 - padding;

  // ---- Outer svg ----
  const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .style("border", "1px solid black");

  // ---- Inner group: move the origin (0,0) to the CENTRE of the svg ----
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

  // ---- Colour scale (ordinal: discrete categories -> colours) ----
  const colourScale = d3.scaleOrdinal()
    .domain(data.map(d => d.category))
    .range(d3.schemeSet2);

  // ---- Pie function: calculates the start/end angle of each slice ----
  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);          // keep the order of the data (small, medium, large)

  // ---- Arc generator: a special kind of path ----
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)   // 0 would make it a pie chart
    .outerRadius(radius);
    // Try these later:
    // .padAngle(0.02)
    // .cornerRadius(6)

  const total = d3.sum(data, d => d.count);

  // ---- Draw the arcs ----
  innerChart
    .selectAll(".arc")
    .data(pie(data))
    .join("path")
      .attr("class", "arc")
      .attr("d", arcGenerator)
      .attr("fill", d => colourScale(d.data.category))
      .attr("stroke", "white")
      .attr("stroke-width", 2);

  // ---- Labels, placed at the centre of each slice ----
  innerChart
    .selectAll(".arc-label")
    .data(pie(data))
    .join("text")
      .attr("class", "arc-label")
      .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#222")
      .call(text => text.append("tspan")
        .attr("x", 0)
        .text(d => d.data.category))
      .call(text => text.append("tspan")
        .attr("x", 0)
        .attr("dy", "1.2em")
        .style("font-weight", "normal")
        .text(d => `${(d.data.count / total * 100).toFixed(1)}%`));

};

// ---- Load and type the data ----
d3.csv("data/Data_exercise 5.3.csv", d => {
  const columns = Object.keys(d);          // read the first two columns by position
  return {
    category: d[columns[0]],
    count: +d[columns[1]]
  };
}).then(data => {
  console.log(data);

  // Small -> Medium -> Large has a natural order, so we don't sort by size.
  // This line only fixes the order if KNIME exported it differently.
  const order = ["small", "medium", "large"];
  data.sort((a, b) =>
    order.indexOf(a.category.toLowerCase()) - order.indexOf(b.category.toLowerCase()));

  drawDonutChart(data);
});