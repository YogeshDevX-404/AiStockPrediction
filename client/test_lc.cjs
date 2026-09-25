const { JSDOM } = require("jsdom");
const { window } = new JSDOM(`<!DOCTYPE html><div id="container"></div>`);
global.document = window.document;
global.window = window;

const lc = require("lightweight-charts");

try {
  const container = document.getElementById("container");
  const chart = lc.createChart(container, {
    layout: {
      background: { type: lc.ColorType.Solid, color: "transparent" },
      textColor: "#94a3b8",
    },
    grid: {
      vertLines: { color: "rgba(255, 255, 255, 0.05)" },
      horzLines: { color: "rgba(255, 255, 255, 0.05)" },
    },
    crosshair: {
      mode: lc.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    timeScale: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      timeVisible: true,
      secondsVisible: false,
    },
    autoSize: true,
  });
  console.log("Chart created successfully");
  
  const series = chart.addCandlestickSeries({
    upColor: '#10b981',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#10b981',
    wickDownColor: '#ef4444',
  });
  console.log("Series created successfully");
} catch (e) {
  console.error("ERROR:", e);
}
