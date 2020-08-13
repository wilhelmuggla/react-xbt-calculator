import ChartJS from "chart.js";

export function createChart(data, chartRef) {
    console.log(data);
  return new ChartJS(chartRef.current, {
    type: "line",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: "rgba(255, 190, 0, 0.4)",
          borderColor: "rgba(255, 190, 0, 0.8)",
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              displayFormats: {
                second: "YYYY-MM-DD H:mm",
                hour: "H:mm",
                day: "d",
              },
            },
          },
        ],
      },
      maintainAspectRatio: false,
      responsive: true,
      lineHeighAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5,
      },
      animation: false,
    },
  });
}

export function updateChart(data, chart) {
  console.log(chart);
  chart.data.datasets[0].data = data;
  chart.update();
}

export const formatChartData = (data) => {
  return data.map((el) => {
    return {
      x: el[0],
      y: el[1].toFixed(2),
    };
  });
};
