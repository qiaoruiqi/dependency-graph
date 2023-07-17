import { Command } from "commander";
import path from "path";
import { madge } from "../lib/api.js";
// const program = new Command();
// program.storeOptionsAsProperties();
// program
//   .name("analyze_dependency")
//   .version('0.0.0')
//   .option("-j, --json", "output as JSON")
//   .parse(process.argv);

const packagePath = path.join(process.cwd(), "package.json");

const packageConfig = madge(packagePath);
// 检查
// if (!program.args.length && !program.stdin) {
//   console.log(program.helpInformation());
//   process.exit(1);
// }
