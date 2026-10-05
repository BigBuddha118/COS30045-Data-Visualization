// Exercise 6 - Load data

d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    starRating: +d.star2,
    energyConsumption: +d.energyConsumption,
    screenTech: d.screenTech.toLowerCase()
  };
}).then(data => {
  console.log(data);

  // data = data.filter(d => d.energyConsumption < 1800);

  drawHistogram(data);
  populateFilters(data);
  drawScatterplot(data);
  createTooltip();
  handleMouseEvents();
});