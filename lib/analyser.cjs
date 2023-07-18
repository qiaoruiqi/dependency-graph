const { parseChunked } = require("@discoveryjs/json-ext");
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
module.exports = {
  getViewerData,
  readStatsFromFile,
};
// 生成一个视图数据
function getViewerData(bundleStats, bundleDir, opts) {
  const { logger = new Logger() } = opts || {};

  // Sometimes all the information is located in `children` array (e.g. problem in #10)
  if (typeof bundleStats === "object" && !Array.isArray(bundleStats)) {
    if (
      !_.isEmpty(bundleStats.dependencies) ||
      !_.isEmpty(bundleStats.devDependencies)
    ) {
      const dependencies_all = {
        ...dependencies,
        ...devDependencies,
      };

      // 过滤开头@的依赖
      const filteredDependencies = Object.fromEntries(
        Object.entries(dependencies_all).filter(([key]) => !key.startsWith("@"))
      );
      // 转换数据
      convertDepToData(filteredDependencies);
    } 
  }
}
// 从指定的文件中读取数据
function readStatsFromFile(filename) {
  return parseChunked(fs.createReadStream(filename, { encoding: "utf8" }));
}
/**
* 绘图数据源赋值
* 需要区分是source还是target
*/
function convertDepToData(dependencies) {
   // 生成目标样式的数据
   // const dependencyArray = Object.entries(dependencies).map(
   //   ([dependency, version]) => ({
   //     source: source?`${dependency}@${version.replace("^", "")}`:null,
   //     target: target?`${dependency}@${version.replace("^", "")}`:null,
   //     type: null,
   //   })
   // );
   this.suits = [this.suits,...(Object.entries(dependencies).map(
     ([dependency, version]) => ({
       source: this.sourceNode?this.sourceNode:`${dependency}@${version.replace("^", "")}`,
       target: this.sourceNode?`${dependency}@${version.replace("^", "")}`:null,
       type: null,
     })
   ))]
 for (let key in dependencies) {
   
   // 调用 searchFolder 函数，传入要搜索的文件夹路径和目标字符串
   const folderPath = "./node_modules"; // 实际的文件夹路径
   const searchString = key; // 目标字符串
   this.sourceNode = key;
   this.searchFolder(folderPath, searchString);
 }
}

  /**
   *
   * @param {} folderPath
   * @param {*} searchString
   */
  searchFolder = (folderPath, searchString) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error retrieving file stats:", err);
            return;
          }

          if (stats.isDirectory() && file === searchString) {
            const packageJsonPath = path.join(filePath, "package.json");
            this.getCycle(packageJsonPath);
          }
        });
      });
    });
  };
