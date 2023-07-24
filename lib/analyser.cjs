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
    const dependencies = buildDependencyGraph(null, filteredDependencies, 0);
    return dependencies;
  }
}

function buildDependencyGraph(sourcedep, dependencies, depth = 0,typeCounter = 1) {
  const graph = [];
  const nodeArray = [];
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
      // 计算权重，深度越深，权重越小
      const weight = 1 / (depth + 1);
      // 将依赖关系添加到图中
      if (sourcedep != null) {
        graph.push({
          source: sourcedep,
          target: dependency,
          type: typeCounter
        });
      }
     
      if (visited.has(dependencyFolder)) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependencyFolder);
      nodeArray.push({ id: dependency, weight, type: typeCounter });
      // 递归构建子依赖关系图
      const subDependencies = buildDependencyGraph(
        dependency,
        filteredDependencies,
        depth + 1 ,// 递归深度增加,
        typeCounter
      );

      // 将子依赖关系图中的节点数组合并到当前节点数组
      nodeArray.push(...subDependencies.nodeArray);

      // 将子依赖关系图中的图信息合并到当前图数组
      graph.push(...subDependencies.graph);
      typeCounter++;
    }
  }

  return { graph, nodeArray };
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
