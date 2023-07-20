const path = require("path");
const fs = require("fs");
const http = require('http');
// 本地引用
const Logger = require("./Logger.cjs");
const analyzer = require("./analyser.cjs");
const { open } = require("./utils.cjs");
module.exports = {
  generateReport,
  startServer,
};
async function startServer(bundleStats, opts) {
  const {
    host = "127.0.0.1",
    port = 5173,
    openBrowser = true,
    bundleDir = null,
    logger = new Logger(),
  } = opts || {};
  const chartData = getChartData({ logger }, bundleStats, bundleDir);
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, this is your Node.js server!");
  });
  server.listen(port, host, () => {
    console.log(`Server is running and listening on http://${host}:${port}/`);
  });
  open(`http://${host}:${port}`);
}

async function generateReport(bundleStats, opts) {
  const {
    openBrowser = true,
    reportTitle,
    bundleDir = null,
    logger = new Logger(),
  } = opts || {};

  const chartData = getChartData({ logger }, bundleStats, bundleDir);
  // const entrypoints = getEntrypoints(bundleStats);

  if (!chartData) return;

  const reportHtml = renderViewer({
    mode: "static",
    title: resolveTitle(reportTitle),
    chartData,
    entrypoints,
    defaultSizes,
    enableWebSocket: false,
  });
  const reportFilepath = path.resolve(
    bundleDir || process.cwd(),
    reportFilename
  );

  fs.mkdirSync(path.dirname(reportFilepath), { recursive: true });
  fs.writeFileSync(reportFilepath, reportHtml);

  logger.info(
    `${bold("Webpack Bundle Analyzer")} saved report to ${bold(reportFilepath)}`
  );

  if (openBrowser) {
    open(`file://${reportFilepath}`, logger);
  }
}

// 根据给定的分析器选项和参数，获取图表数据
function getChartData(analyzerOpts, ...args) {
  let chartData;
  const { logger } = analyzerOpts;

  try {
    chartData = analyzer.getViewerData(...args, analyzerOpts, null);
  } catch (err) {
    logger.error(`Could't analyze webpack bundle:\n${err}`);
    logger.debug(err.stack);
    chartData = null;
  }

  return chartData;
}
