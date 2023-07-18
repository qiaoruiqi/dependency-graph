const analyzer = require("./analyser.cjs");
const viewer = require("./viewer.cjs");

async function parseAndAnalyse(bundleStatsFile) {
  const bundleStats =await analyzer.readStatsFromFile(bundleStatsFile);
  viewer.generateReport(bundleStats);
}
parseAndAnalyse("./package.json");
