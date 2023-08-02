const { parseChunked } = require("@discoveryjs/json-ext");
const util = require("util");
const fs = require("fs");
const fsPromises = fs.promises;
const resolve = util.promisify(require.resolve);
const stat = util.promisify(fs.stat);
const path = require("path");
const { log } = require("console");
module.exports = {
  getViewerData,
  readStatsFromFile,
};
let visited = new Set();
const folderPath = "../node_modules"; // 实际的文件夹路径
let param1Processed = true;
let visitedProcess = true;
// 生成一个视图数据
async function getViewerData(bundleStats, bundleDir, param1) {
  console.log(99, param1);
  if (typeof bundleStats === "object" && !Array.isArray(bundleStats)) {
    const filteredDependencies = handleDependency(bundleStats);
    visited = new Set();
    param1Processed = true;
    visitedProcess = true;
    const dependencies = await buildDependencyGraph(
      null,
      filteredDependencies,
      0,
      1,
      param1
    );
    return dependencies;
  }
}
async function buildDependencyGraph(
  sourcedep,
  dependencies,
  depth = 0,
  typeCounter = 1,
  param1 = null
) {
  const graph = [];
  const nodeArray = [];
  for (const dependency in dependencies) {
    const dependencyFolder = path.join(folderPath, dependency);
    const dependencyPackageJsonPath = path.join(
      dependencyFolder,
      "package.json"
    );
    // 计算权重，深度越深，权重越小
    const weight = 1 / (depth + 1);
    if (param1 == dependency && param1Processed ) {
      
      nodeArray.push({ id: dependency, weight, type: typeCounter });
      param1Processed = false;
    }
    // 如果是有搜索条件的话，需要给visited清空，之前set里存放的
    if (param1 == sourcedep && visitedProcess ) {
      visited = new Set();
      visitedProcess = false;
    }
    if ((param1 != null && param1 == sourcedep) || param1 == null) {
      
      // 将依赖关系添加到图中
      if (sourcedep != null) {
        graph.push({
          source: sourcedep,
          target: dependency,
          type: typeCounter,
        });
      }

      if (visited.has(dependencyFolder)) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependencyFolder);
      nodeArray.push({ id: dependency, weight, type: typeCounter });
    } else {
      if (visited.has(dependencyFolder) ) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependencyFolder);
    }
    
    // let { status } = await checkfilefs(dependencyPackageJsonPath);
    let { status } =  checkfileRequire(dependencyPackageJsonPath);
    
    if (status) {
      // 异步读取依赖的 package.json
      const bundleStats =  readPackageJsonRequire(dependencyPackageJsonPath)
      // const bundleStats = await readPackageJson(dependencyPackageJsonPath);
      if (bundleStats != null) {
        // 同步读依赖的 package.json
        // const bundleStats = JSON.parse(
        //   fs.readFileSync(dependencyPackageJsonPath, "utf8")
        // );
        const filteredDependencies = handleDependency(bundleStats);

        // 递归构建子依赖关系图
        const subDependencies = await buildDependencyGraph(
          dependency,
          filteredDependencies,
          depth + 1, // 递归深度增加,
          typeCounter,
          param1 !== null && param1 == sourcedep ? dependency : param1
        );
        // if (param1 != null && param1 == sourcedep ) {
        //   visited.delete(dependencyFolder);
        // }
        if (subDependencies.nodeArray)
          // 将子依赖关系图中的节点数组合并到当前节点数组
          nodeArray.push(...subDependencies.nodeArray);
        if (subDependencies.graph)
          // 将子依赖关系图中的图信息合并到当前图数组
          graph.push(...subDependencies.graph);
        typeCounter++;
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
  return { graph, nodeArray };
}
// 用require.resolve解决
function checkfileRequire(dependencyPackageJsonPath){
  try {
    require.resolve(dependencyPackageJsonPath);
    return { status: true }; // 返回true表示文件存在
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Files not found: ${dependencyPackageJsonPath}`);
    } else {
      console.error(`Error checking file: ${err.message}`);
    }
    return { status: false }; // 返回false表示文件不存在
  }
}
// 用fs判断文件是否存在，但是无法读取全局存储库中的共享文件
async function checkfilefs(dependencyPackageJsonPath) {
  try {
    await fsPromises.stat(dependencyPackageJsonPath);
    return { status: true }; // 返回true表示文件存在
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Files not found: ${dependencyPackageJsonPath}`);
    } else {
      console.error(`Error checking file: ${err.message}`);
    }
    return { status: false }; // 返回false表示文件不存在
  }
}
function readPackageJsonRequire(dependencyPackageJsonPath){
  return require(dependencyPackageJsonPath);
}
async function readPackageJson(dependencyPackageJsonPath) {
  return fsPromises
    .readFile(dependencyPackageJsonPath, "utf8")
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Error reading package.json: ${err.message}`);
      return null;
    });
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
