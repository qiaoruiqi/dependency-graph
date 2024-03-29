const { parseChunked } = require("@discoveryjs/json-ext");
const util = require("util");
const fs = require("fs");
const fsPromises = fs.promises;
const stat = util.promisify(fs.stat);
const path = require("path");
const { log } = require("console");
module.exports = {
  getViewerData,
  readStatsFromFile,
};
const folderPath = "./node_modules"; // 实际的文件夹路径
let origin;
// 生成一个视图数据
async function getViewerData(bundleStats, bundleDir, param1) {
  console.log(99, param1);
  if (typeof bundleStats === "object" && !Array.isArray(bundleStats)) {
    const filteredDependencies = handleDependency(bundleStats);
    let visited = new Set();
    origin = param1;
    const dependencies = await buildDependencyGraph(
      null,
      filteredDependencies,
      0,
      1,
      visited,
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
  visited,
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
    if (param1 == dependency) {
      const weight = 1 / (depth + 1);
      nodeArray.push({ id: dependency, weight, type: typeCounter });
    }
    if ((param1 != null && param1 == sourcedep) || param1 == null) {
      // 计算权重，深度越深，权重越小
      const weight = 1 / (depth + 1);
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
    // 同步判断文件是否存在
    // if (
    //   fs.existsSync(dependencyFolder) &&
    //   fs.existsSync(dependencyPackageJsonPath)
    // ) {
    // 异步判断文件是否存在
    let { status } = await checkfile(dependencyPackageJsonPath);
    if (status) {
      // 异步读取依赖的 package.json
      const bundleStats = await readPackageJson(dependencyPackageJsonPath);
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
          visited,
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
async function checkfile(dependencyPackageJsonPath) {
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
// async function buildDependencyGraph(
//   sourcedep,
//   dependencies,
//   depth = 0,
//   typeCounter = 1
// ) {
//   const graph = [];
//   const nodeArray = [];
//    dependencies = Object.entries(dependencies).map(([key, value]) => key);
//   for (const dependency of dependencies) {
//     const dependencyFolder = path.join(folderPath, dependency);
//     const dependencyPackageJsonPath = path.join(
//       dependencyFolder,
//       "package.json"
//     );
//     if (
//       fs.existsSync(dependencyFolder) &&
//       fs.existsSync(dependencyPackageJsonPath)
//     ) {
//   //   const readPromise =await fsPromises.readFile(dependencyPackageJsonPath, "utf8")
//   //   .catch(err => {
//   //     console.error(`Error reading package.json: ${err.message}`);
//   //     return null;
//   //   });

//   // if (!readPromise) {
//   //   // 处理读取文件失败的情况
//   //   continue;
//   // }

//   // const bundleStats = JSON.parse(readPromise);

//   const bundleStats = JSON.parse(
//     fs.readFileSync(dependencyPackageJsonPath, "utf8")
//   );
//     const filteredDependencies = handleDependency(bundleStats);
//     const weight = 1 / (depth + 1);
//     if (sourcedep != null) {
//       graph.push({
//         source: sourcedep,
//         target: dependency,
//         type: typeCounter,
//       });
//     }

//     if (!visited.has(dependencyFolder)) {
//       visited.add(dependencyFolder);
//       nodeArray.push({ id: dependency, weight, type: typeCounter });
//       const subDependencies = await buildDependencyGraph(
//         dependency,
//         filteredDependencies,
//         depth + 1,
//         typeCounter
//       );

//       nodeArray.push(...subDependencies.nodeArray);

//       // 将子依赖关系图中的图信息合并到当前图数组
//       graph.push(...subDependencies.graph);
//       typeCounter++;

//       // 将子依赖关系图中的节点数组合并到当前节点数组
//     }
//     return { graph, nodeArray };
//   }
// }
// }
async function readPackageJson(dependencyPackageJsonPath) {
  return fsPromises
    .readFile(dependencyPackageJsonPath, "utf8")
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Error reading package.json: ${err.message}`);
      return null;
    });
}

// async function buildDependencyGraph(
//   sourcedep,
//   dependencies,
//   depth = 0,
//   typeCounter = 1
// ) {

// 将fsPromises.stat()操作封装成Promise数组
// const statPromises = Object.keys(dependencies).map(async (dependency) => {
//   const dependencyFolder = path.join(folderPath, dependency);
//   const dependencyPackageJsonPath = path.join(
//     dependencyFolder,
//     "package.json"
//   );
//   try {
//     await fsPromises.stat(dependencyPackageJsonPath);
//     return { dependency, status: true }; // 返回true表示文件存在
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       console.error(`Files not found: ${dependencyPackageJsonPath}`);
//     } else {
//       console.error(`Error checking file: ${err.message}`);
//     }
//     return { dependency, status: false }; // 返回false表示文件不存在
//   }
// });

// // 并行执行所有的fsPromises.stat()操作
// const statResults = await Promise.all(statPromises);

//   const graph = [];
//   const nodeArray = [];
//   for (const dependency in dependencies) {
//     const dependencyFolder = path.join(folderPath, dependency);
//     const dependencyPackageJsonPath = path.join(
//       dependencyFolder,
//       "package.json"
//     );

//     // 检查依赖的文件夹和 package.json 是否存在
//     // if (
//     //   fs.existsSync(dependencyFolder) &&
//     //   fs.existsSync(dependencyPackageJsonPath)
//     // ) {
//     const data = await fsPromises.readFile(
//       dependencyPackageJsonPath,
//       "utf8"
//     );
//     // 读取依赖的 package.json
//     const bundleStats = JSON.parse(data);
//     const filteredDependencies = handleDependency(bundleStats);
//     // 计算权重，深度越深，权重越小
//     const weight = 1 / (depth + 1);
//     // 将依赖关系添加到图中
//     if (sourcedep != null) {
//       graph.push({
//         source: sourcedep,
//         target: dependency,
//         type: typeCounter,
//       });
//     }

//     if (visited.has(dependencyFolder)) {
//       continue; // 跳过处理，避免环形依赖
//     }
//     visited.add(dependencyFolder);
//     nodeArray.push({ id: dependency, weight, type: typeCounter });
//     // 递归构建子依赖关系图
//     const subDependencies = buildDependencyGraph(
//       dependency,
//       filteredDependencies,
//       depth + 1, // 递归深度增加,
//       typeCounter
//     );

//      // 将子依赖关系图中的节点数组合并到当前节点数组
//      if (subDependencies && subDependencies.nodeArray) {
//       nodeArray.push(...subDependencies.nodeArray);
//     }

//     // 将子依赖关系图中的图信息合并到当前图数组
//     if (subDependencies && subDependencies.graph) {
//       graph.push(...subDependencies.graph);
//     }
//     typeCounter++;
//   }

//   return { graph, nodeArray };
// }
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
