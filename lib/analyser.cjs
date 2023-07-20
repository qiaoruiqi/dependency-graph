const { parseChunked } = require("@discoveryjs/json-ext");
const util = require("util");
const fs = require("fs");
const stat = util.promisify(fs.stat);
const path = require("path");
const { log } = require("console");
module.exports = {
  getViewerData,
  readStatsFromFile,
};
const folderPath = "./node_modules"; // 实际的文件夹路径
let visited = new Set();
// 生成一个视图数据
function getViewerData(bundleStats, bundleDir, opts, first) {
  // const { logger = new Logger() } = opts || {};
  // Sometimes all the information is located in `children` array (e.g. problem in #10)
  if (typeof bundleStats === "object" && !Array.isArray(bundleStats)) {
    const filteredDependencies = handleDependency(bundleStats);
    const dependencies = buildDependencyGraph(null, filteredDependencies);
    return dependencies;
  }
}

function buildDependencyGraph(sourcedep, dependencies) {
  const graph = [];

  for (const dependency in dependencies) {
    const dependencyFolder = path.join(folderPath, dependency);
    const dependencyPackageJsonPath = path.join(
      dependencyFolder,
      "package.json"
    );

    // 检查依赖的文件夹和 package.json 是否存在
    if (
      fs.existsSync(dependencyFolder) &&
      fs.existsSync(dependencyPackageJsonPath)
    ) {
      // 读取依赖的 package.json
      const bundleStats = JSON.parse(
        fs.readFileSync(dependencyPackageJsonPath, "utf8")
      );
      const filteredDependencies = handleDependency(bundleStats);

      // 将依赖关系添加到图中
      if (sourcedep != null)
        graph.push({ source: sourcedep, target: dependency });

      if (visited.has(dependencyFolder)) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependencyFolder);

      // 递归构建子依赖关系图
      const subDependencies = buildDependencyGraph(
        dependency,
        filteredDependencies
      );
      graph.push(...subDependencies);
    }
  }

  return graph;
}
// 从指定的文件中读取数据
function readStatsFromFile(filename) {
  return JSON.parse(fs.readFileSync(filename, "utf8"));
}

// 依赖合并处理
function handleDependency(bundleStats) {
  const dependencies_all = {
    ...bundleStats.dependencies,
    ...bundleStats.devDependencies,
  };

  // 过滤开头@的依赖
  return Object.fromEntries(
    Object.entries(dependencies_all).filter(([key]) => !key.startsWith("@"))
  );
}
