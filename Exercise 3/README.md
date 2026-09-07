# Appliance Energy Consumption Website

A small multi-page website built for **COS30045 – Data Visualisation**, extended from
Exercise 0.2 into **Exercise 3 – Communicating Data Insights**.

## Purpose
This project demonstrates:
- structuring a simple multi-page website using HTML
- consistent styling across pages using CSS
- basic interactivity with JavaScript (navigation highlighting, FAQ accordion, Chart.js charts)
- regular, meaningful commits to a GitHub repository
- turning a real dataset into an audience-focused data story (Exercise 3)

## Data Story

**Audience:** Australian households currently shopping for a new TV — budget-conscious,
not necessarily technical, comparing screen size and price across models in-store or online.

**What they want to know:** "Will a bigger screen blow out my power bill, and does the type
of screen (LCD vs OLED) actually matter for running cost?"

**The story:** Using the Australian Government's Energy Rating registration database
(4,724 approved TV models), the Televisions page shows that:
1. Running cost rises sharply and consistently with screen size (r = 0.86) — roughly an
   8× difference in estimated annual cost between a 32"-or-smaller TV and an 80"+ TV.
2. For shoppers set on a very large screen, panel technology still matters: in the 80"+
   band, OLED models average a noticeably *lower* running cost than standard LCD/LED models,
   contrary to OLED's power-hungry reputation.

**Recommendation to the audience:** budget for running cost as part of the TV's total cost
of ownership, and compare the energy label's kWh/year figure and star rating — not just
screen size or panel technology by reputation — before buying.

See `televisions.html` for the full charts and narrative.

## Pages
- `index.html` – Home page with intro content, a Data Story summary, and FAQ accordion
- `televisions.html` – The full data story: audience framing, two Chart.js visualisations, and supporting narrative
- `about.html` – About the project, including **About the Data** and **AI Declaration** sections

## Folder Structure
```
energy-webpage-v1/
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
├── images/
│   └── PowerIcon.png
├── index.html
├── televisions.html
├── about.html
└── README.md
```

## How to Run
Open `index.html` in a browser, or use the **Live Server** extension in VS Code
for automatic reload while editing.

## About the Data

**Data source:** Television data is drawn from the Australian Government's
[Energy Rating registration database](https://reg.energyrating.gov.au/), the public
register of GEMS-regulated appliances approved for sale in Australia. The snapshot used
(`data/tv_full.csv`) contains 4,724 currently approved TV registrations (Feb 2026), including
brand, model, screen size, panel technology, power draw, and labelled energy consumption
(kWh/year). Aggregated figures used in the charts are in `data/tv_summary_by_size.csv` and
`data/tv_summary_80in_by_tech.csv`.

**Data processing:** Screen size was converted cm → inches to match retail marketing.
Models were grouped into six retail-style size bands. Annual running cost was estimated as
labelled kWh/year × AU$0.30/kWh (an approximate, illustrative electricity rate — real tariffs
vary by state/retailer). Brand names are recorded inconsistently in the raw data (e.g.
"SAMSUNG" / "Samsung" / "SAMSUNG ELECTRONICS") and were **not** cleaned, since the story
groups by size/technology rather than brand; this would need addressing for any brand-level
analysis.

**Privacy:** The dataset contains only product registration data (brand, model, technical
specs) submitted by manufacturers/importers to a government regulator — no personal or
household data, and no individuals are identifiable.

**Accuracy and limitations:**
- Labelled kWh/year figures come from standardised lab testing (AS/NZS 62087.1:2010), not
  real households — actual use varies with brightness, viewing hours, and picture mode.
- The $0.30/kWh rate is illustrative, not a bill forecast.
- The 80"+ "LCD" (non-LED) group has a very small sample (n = 18) vs LCD (LED) (n = 535) and
  OLED (n = 103) — read that comparison cautiously.
- "Country" refers to country of manufacture, not country of sale, and was not used here.

**Ethics:** The story reports on aggregated size/technology categories rather than naming or
ranking individual brands, to avoid unfairly singling out manufacturers given the known
brand-name recording inconsistencies. All assumptions (electricity rate, size bands) are
stated explicitly so readers can judge how much weight to put on exact dollar figures.

## AI Declaration

Generative AI (Claude, Anthropic) was used to assist with this project:
- Boilerplate HTML/CSS/JS structure and the site icon (Exercise 0.2).
- Profiling and aggregating the raw Energy Rating CSV (grouping by size/technology, computing
  averages) to produce the summary figures used in the Exercise 3 charts.
- Drafting the Chart.js configuration and the data story narrative text, based on the
  aggregated figures.
- Drafting the "About the Data" and AI Declaration wording.

All AI-assisted output was reviewed by the author, checked against the source data, and
edited before inclusion. The choice of audience, question, story angle, and final accuracy
review were made by the author.
