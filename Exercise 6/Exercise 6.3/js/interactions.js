// Exercise 6.2 - Interactive filters

const populateFilters = data => {

  const filterButtons = d3.select("#filters_screen")
    .selectAll(".filter-btn")
    .data(filters)
    .join("button")
      .attr("class", "filter-btn")
      .classed("active", d => d.isActive)
      .text(d => d.label)
      .on("click", (event, d) => {
        console.log(d);

        // Only one filter active at a time
        filters.forEach(f => f.isActive = false);
        d.isActive = true;

        filterButtons.classed("active", f => f.isActive);

        updateHistogram(d.id);
      });

  const updateHistogram = id => {

    const updatedData = id === "all"
      ? data
      : data.filter(d => d.screenTech?.toLowerCase() === id.toLowerCase());

    const updatedBins = binGenerator(updatedData);

    const binsMaxLength = d3.max(updatedBins, d => d.length);
    yScale.domain([0, binsMaxLength]).nice();

    innerChart
      .selectAll(".bar")
      .data(updatedBins)
      .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2)
      .transition()
        .duration(600)
        .ease(d3.easeCubicOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));

    innerChart
      .select(".y-axis")
      .transition()
        .duration(600)
      .call(d3.axisLeft(yScale));

  };

};

// Exercise 6.4 stubs - built next exercise
const createTooltip = () => {};
const handleMouseEvents = () => {};