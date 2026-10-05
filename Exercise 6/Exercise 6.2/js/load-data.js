// Exercise 6 - Load data

d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    starRating: +d.star2,
    energyConsumption: +d.energyConsumption
  };
}).then(data => {
  console.log(data);

  // The brief notes one TV has an extreme energy consumption value that
  // makes the rest of the histogram hard to read. Uncomment to exclude it:
  // data = data.filter(d => d.energyConsumption < 1800);

  drawHistogram(data);
});