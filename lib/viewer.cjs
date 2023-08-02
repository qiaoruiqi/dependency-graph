const path = require("path");
const fs = require("fs");
const http = require("http");
// 本地引用
const Logger = require("./Logger.cjs");
const analyzer = require("./analyser.cjs");
const { open } = require("./utils.cjs");
const express = require("express");
const cors = require("cors");
const app = express();
module.exports = {
  generateReport,
  startServer,
};
function startServer(bundleStats, opts) {
  const {
    // host = "local",
    port = 4000,
    openBrowser = true,
    bundleDir = null,
    logger = new Logger(),
  } = opts || {};
  // const chartData = getChartData({ logger }, bundleStats, bundleDir);
  //  const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("Hello, this is your Node.js server!");
  // });
  // server.listen(port, () => {
  //   console.log(`Server is running and listening on http://local:${port}/`);
  // });
  // const chartData = getChartData({ logger }, bundleStats, bundleDir);
  app.use(cors());
  app.get("/search", async (req, res) => {
    const param1 = req.query.param1;

    try {
      const data = await analyzer.getViewerData(bundleStats, bundleDir, param1);
      res.json(data); 
      // 发送数据给前端
    } catch (err) {
      debugger;
      // 错误处理
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.listen(port, () => {
    console.log("服务器正在运行，端口：4000");
  });
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
    console.error(`Error building dependency graph: ${err}`);
    chartData = null;
  }

  return chartData;
}
