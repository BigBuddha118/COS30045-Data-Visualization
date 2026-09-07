// ===========================================================
// Data pre-aggregated from data/tv_full.csv (see data/tv_summary_*.csv
// for the exact aggregation, and the "About the data" page for the
// processing steps used to get from raw registrations to these figures).
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {

  const AMBER = "#ffc107";
  const AMBER_DARK = "#e0a800";
  const CHARCOAL = "#212121";

  // --- Chart 1: running cost by screen size band ---
  const sizeCtx = document.getElementById("sizeChart");
  if (sizeCtx) {
    new Chart(sizeCtx, {
      type: "bar",
      data: {
        labels: ['32" or smaller', '40–43"', '50–55"', '60–65"', '70–75"', '80"+'],
        datasets: [
          {
            label: "Estimated annual running cost (AUD)",
            data: [31, 62, 101, 147, 186, 264],
            backgroundColor: AMBER,
            borderColor: AMBER_DARK,
            borderWidth: 1,
            yAxisID: "y"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average yearly running cost by screen size (n = 4,724 models)",
            color: CHARCOAL
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const kwh = [104, 208, 337, 490, 621, 879][ctx.dataIndex];
                return [`Cost: $${ctx.parsed.y}/year`, `Energy use: ${kwh} kWh/year`];
              }
            }
          }
        },
        scales: {
          y: {
            title: { display: true, text: "Estimated cost (AUD/year @ $0.30/kWh)" },
            beginAtZero: true
          }
        }
      }
    });
  }

  // --- Chart 2: 80"+ running cost by panel technology ---
  const techCtx = document.getElementById("techChart");
  if (techCtx) {
    new Chart(techCtx, {
      type: "bar",
      data: {
        labels: ["LCD (n=18)", "LCD (LED) (n=535)", "OLED (n=103)"],
        datasets: [
          {
            label: "Estimated annual running cost (AUD)",
            data: [318, 271, 215],
            backgroundColor: [AMBER_DARK, AMBER, "#4caf50"],
            borderColor: CHARCOAL,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Running cost for 80"+ TVs, by panel technology',
            color: CHARCOAL
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const kwh = [1058, 904, 716][ctx.dataIndex];
                return [`Cost: $${ctx.parsed.y}/year`, `Energy use: ${kwh} kWh/year`];
              }
            }
          }
        },
        scales: {
          y: {
            title: { display: true, text: "Estimated cost (AUD/year @ $0.30/kWh)" },
            beginAtZero: true
          }
        }
      }
    });
  }
});
