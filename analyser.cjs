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
let aimdepth ;
let visited = new Set();
let folderPath = "../node_modules"; // 实际的文件夹路径
let param1Processed = true;
let visitedProcess = true;
let ispnpm;
// let baseDir = "";
// 生成一个视图数据
async function getViewerData(bundleStats, bundleDir, param1,level) {
  if (typeof bundleStats === "object" && !Array.isArray(bundleStats)) {
    const filteredDependencies = handleDependency(bundleStats);
    visited = new Set();
    param1Processed = true;
    visitedProcess = true;
    aimdepth = parseInt(level);;
    const dependencies = await buildDependencyGraph(
      bundleDir,
      null,
      filteredDependencies,
      0,
      1,
      param1
    );
    // 对数据进行处理，由于版本不同的原因，需要将重复的指向和节点给删除掉
    const uniquedependencies = handleUniquedependencies(dependencies);
    return uniquedependencies;
  }
}
// 删除不同版本带来重复的数据
function handleUniquedependencies(dependencies) {
  const { graph, nodeArray } = dependencies;
  const uniqueGraph = [];
  const uniqueNodeArray = [];
  for (const item of graph) {
    const isDuplicate = uniqueGraph.some(
      (uniqueItem) =>
        uniqueItem.source === item.source && uniqueItem.target === item.target
    );
    if (!isDuplicate) {
      uniqueGraph.push(item);
    }
  }
  for (const item of nodeArray) {
    const isDuplicate = uniqueNodeArray.some(
      (uniqueItem) => uniqueItem.id === item.id
    );

    if (!isDuplicate) {
      uniqueNodeArray.push(item);
    }
  }
  return { uniqueGraph, uniqueNodeArray };
}
// 构建依赖
async function buildDependencyGraph(
  baseDir,
  sourcedep,
  dependencies,
  depth = 0,
  typeCounter = 1,
  param1 = null
) {
  const graph = [];
  const nodeArray = [];
  if(depth > aimdepth)  return { graph, nodeArray };
  for (const dependency in dependencies) {
    const value = dependencies[dependency].replace("^", "@");
    dependency_ = dependency + value;
    // 计算权重，深度越深，权重越小
    const weight = 1 / (depth + 1);
    if (param1 == dependency && param1Processed) {
      nodeArray.push({ id: dependency, weight, type: typeCounter });
      param1Processed = false;
    }
    // 如果是有搜索条件的话，需要给visited清空，之前set里存放的
    if (param1 == sourcedep && visitedProcess) {
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

      if (visited.has(dependency_)) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependency_);
      nodeArray.push({ id: dependency, weight, type: typeCounter });
    } else {
      if (visited.has(dependency_)) {
        continue; // 跳过处理，避免环形依赖
      }
      visited.add(dependency_);
    }
    // 处理不同包依赖工具的路径不同的代码
    ispnpm = checkispnpm(baseDir);
    if (ispnpm) {
      folderPath = baseDir;
      while (!folderPath.endsWith('node_modules')) {
        folderPath = path.dirname(folderPath);
      }
    } else {
      if(!baseDir.includes('node_modules')){
        folderPath = path.join(
          path.dirname(require.resolve(baseDir)),
          "/node_modules"
        );
      }else{
        folderPath = baseDir;
      while (!folderPath.endsWith('node_modules')) {
        folderPath = path.dirname(folderPath);
        }
      }
      
    }
    const dependencyFolder = path.join(folderPath, dependency);
    let dependencyPackageJsonPath;
    dependencyPackageJsonPath = path.join(dependencyFolder, "package.json");

    // let { status } = await checkfilefs(dependencyPackageJsonPath);
    let { status, path_ } = checkfileRequire(dependencyPackageJsonPath);

    if (status) {
      // 异步读取依赖的 package.json
      const bundleStats = readPackageJsonRequire(dependencyPackageJsonPath);
      // const bundleStats = await readPackageJson(dependencyPackageJsonPath);
      if (bundleStats != null) {
        // 同步读依赖的 package.json
        // const bundleStats = JSON.parse(
        //   fs.readFileSync(dependencyPackageJsonPath, "utf8")
        // );
        const filteredDependencies = handleDependency(bundleStats);
      
        // 递归构建子依赖关系图
        const subDependencies = await buildDependencyGraph(
          path_,
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
function checkfileRequire(dependencyPackageJsonPath) {
  try {
    let path_ = require.resolve(dependencyPackageJsonPath);
    return { status: true, path_ }; // 返回true表示文件存在
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
function readPackageJsonRequire(dependencyPackageJsonPath) {
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

  // // 过滤开头@的依赖
  // return Object.fromEntries(
  //   Object.entries(dependencies_all).filter(([key]) => !key.startsWith("@"))
  // );
  return dependencies_all;
}
// 判断文件是否是pnpm安装的文件，如果是的话，需要对文件夹额外处理，需要让文件夹向上找
function checkispnpm(bundleDir) {
  let resolvedPath = require.resolve(bundleDir);
  baseDir = resolvedPath;
  if (resolvedPath.includes(".pnpm")) {
    return true;
  } else {
    return false;
  }
}
