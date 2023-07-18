const {resolve, dirname} = require('path');
const commander = require('commander');
const path = require('path');
const analyzer = require('../lib/analyser');
const viewer = require('../lib/viewer.cjs');
const Logger = require('../lib/Logger');
import { madge } from "../lib/api.js";

const program = commander
  .name("analyze_dependency")
  .version(require("../package.json").version)
  .usage(
    `<bundleStatsFile> [bundleDir] [options]
    
      Arguments:
    
        bundleStatsFile  Path to Webpack Stats JSON file.
        bundleDir        Directory containing all generated bundles.
                         You should provided it if you want analyzer to show you the real parsed module sizes.
                         By default a directory of stats file is used.`
  )
  .option(
    "-m, --mode <mode>",
    "Analyzer mode. Should be `server`,`static` or `json`." +
      br(
        "In `server` mode analyzer will start HTTP server to show bundle report."
      ) +
      br(
        "In `static` mode single HTML file with bundle report will be generated."
      ) +
      br(
        "In `json` mode single JSON file with bundle report will be generated."
      ),
    "static"
  )
  .option(
    '-t, --title <title>',
    'String to use in title element of html report.'
  )
  .option(
    '-O, --no-open',
    "Don't open report in default browser automatically."
  )
  .option(
    '-l, --log-level <level>',
    'Log level.' +
    br(`Possible values: ${[...Logger.levels].join(', ')}`),
    Logger.defaultLevel
  )
  .parse(process.argv);
let [bundleStatsFile, bundleDir] = program.args;
let {
  mode,
  open: openBrowser,
  title: reportTitle,
  logLevel,
} = program.opts();
if (!bundleStatsFile) showHelp('Provide path to Webpack Stats file as first argument');
if (mode !== 'server' && mode !== 'static' && mode !== 'json') {
  showHelp('Invalid mode. Should be either `server`, `static` or `json`.');
}
bundleStatsFile = resolve(bundleStatsFile);

const packagePath = path.join(process.cwd(), "package.json");
parseAndAnalyse(bundleStatsFile);

async function parseAndAnalyse(bundleStatsFile) {
  try {
    const bundleStats = await analyzer.readStatsFromFile(bundleStatsFile);
    if (mode === 'server') {

    } else if (mode === 'static') {
      viewer.generateReport(bundleStats, {
        openBrowser,
        reportFilename: resolve(reportFilename || 'report.html'),
        reportTitle,
        bundleDir,
        logger: new Logger(logLevel)
      });
    } else if (mode === 'json') {
      viewer.generateJSONReport(bundleStats, {
        reportFilename: resolve(reportFilename || 'report.json'),
        bundleDir,
        excludeAssets,
        logger: new Logger(logLevel)
      });
    }
  } catch (err) {
    logger.error(`Couldn't read webpack bundle stats from "${bundleStatsFile}":\n${err}`);
    logger.debug(err.stack);
    process.exit(1);
  }
}

function showHelp(error) {
  if (error) console.log(`\n  ${magenta(error)}\n`);
  program.outputHelp();
  process.exit(1);
}

const packageConfig = madge(packagePath);
// 检查
// if (!program.args.length && !program.stdin) {
//   console.log(program.helpInformation());
//   process.exit(1);
// }
