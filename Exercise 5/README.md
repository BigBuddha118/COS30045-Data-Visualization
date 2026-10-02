# Exercise 5 – Multi-Chart Webpage

## Aim
Create a variety of different chart types using **D3.js**.

## Purpose
In previous exercises, we created simple charts such as a horizontal bar chart. In this exercise, multiple chart types are built and presented together on a single webpage, using D3 to visualise different types of data and to understand when different chart types are appropriate.

## Charts Built

- **Exercise 5.1 – Bar Chart**
  Mean energy consumption (kWh/year) by screen technology (LED, OLED, LCD) for 55-inch TVs. Built with scaled, labelled x and y axes (`scaleBand` / `scaleLinear`).

- **Exercise 5.2 – Line Chart (with scatter points)**
  Average wholesale electricity spot price ($/MWh) across the mainland NEM states, 1998–2024. Includes both a scatter-point layer and a connecting line, using `scaleLinear` for both axes and `d3.line()` as the path generator.

- **Exercise 5.3 – Donut Chart**
  Proportion of approved TV models by screen size category (Small / Medium / Large), using `d3.pie()` and `d3.arc()` with an ordinal colour scale.

## Deviations from Brief
The original brief specified the donut chart should show energy consumption by screen technology across all TVs, and a separate scatter plot of energy consumption vs. star rating. This submission instead uses a donut of TV size category proportions, and does not currently include a standalone energy-vs-star-rating scatter plot (the line chart's scatter points plot year vs. spot price, not energy vs. rating). This note is left here as an accurate record — remove it if a star-rating scatter plot is added before submission, or if the alternate dataset choice is confirmed acceptable.

## Repository Structure