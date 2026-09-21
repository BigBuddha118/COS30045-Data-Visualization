const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 800")
      .style("border", "1px solid black");

svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("data/BrandCount.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d["Count(SoldIn)"]
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count));

  data.sort((a, b) => b.count - a.count);
  console.log(data);

  drawBarChart(data);
});

const drawBarChart = data => {

  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 400]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 800])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar-${d.count}`)
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue")
      .attr("x", 0)
      .attr("y", d => yScale(d.brand));

};