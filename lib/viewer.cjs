const path = require('path');
const fs = require('fs');
// 本地引用
const analyzer = require('./analyser.cjs');

module.exports = {
  generateReport
};

async function generateReport(bundleStats, opts) {
  const {
    openBrowser = true,
    reportTitle,
    bundleDir = null,
    logger = new Logger()
  } = opts || {};

  const chartData = getChartData({logger}, bundleStats, bundleDir);
  const entrypoints = getEntrypoints(bundleStats);

  if (!chartData) return;

  const reportHtml = renderViewer({
    mode: 'static',
    title: resolveTitle(reportTitle),
    chartData,
    entrypoints,
    defaultSizes,
    enableWebSocket: false
  });
  const reportFilepath = path.resolve(bundleDir || process.cwd(), reportFilename);

  fs.mkdirSync(path.dirname(reportFilepath), {recursive: true});
  fs.writeFileSync(reportFilepath, reportHtml);

  logger.info(`${bold('Webpack Bundle Analyzer')} saved report to ${bold(reportFilepath)}`);

  if (openBrowser) {
    open(`file://${reportFilepath}`, logger);
  }
}

// 根据给定的分析器选项和参数，获取图表数据
function getChartData(analyzerOpts, ...args) {
  let chartData;
  const {logger} = analyzerOpts;

  try {
    chartData = analyzer.getViewerData(...args, analyzerOpts);
  } catch (err) {
    logger.error(`Could't analyze webpack bundle:\n${err}`);
    logger.debug(err.stack);
    chartData = null;
  }

  if (_.isPlainObject(chartData) && _.isEmpty(chartData)) {
    logger.error("Could't find any javascript bundles in provided stats file");
    chartData = null;
  }

  return chartData;
}