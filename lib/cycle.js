const fs = require('fs');
const path = require('path');
const {parseChunked} = require('@discoveryjs/json-ext');
class Cycle {
  constructor(path) {
    this.cycle = new Array();
    this.suits = null;
    // { "source": "commander@11.0.0", "target": null, "type": null };
    this.targetNode = null;
    this.sourceNode = null;
    this.getCycle(path);
    
  }
  // 从指定的文件中读取数据
 readStatsFromFile(filename) {
  return parseChunked(
    fs.createReadStream(filename, {encoding: 'utf8'})
  );
}

  /**
   * 获得初始的节点
   * @param {String} path
   */
  getCycle(path) {
    if (!path) {
      throw new Error("path argument not provided");
    }
    const packageJson = JSON.parse(fs.readFileSync(path, "utf8"));
    if (typeof packageJson === "object" && !Array.isArray(packageJson)) {
      let { dependencies, devDependencies } = packageJson;
      const dependencies_all = {
        ...dependencies,
        ...devDependencies,
      };
      // 过滤开头@的依赖
      const filteredDependencies = Object.fromEntries(
        Object.entries(dependencies_all).filter(([key]) => !key.startsWith("@"))
      );
      // 转换数据
      this.convertDepToData(filteredDependencies)
    }
  }
  /**
   * 绘图数据源赋值
   * 需要区分是source还是target
   */
  convertDepToData(dependencies) {
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
}

export function cycle(path) {
  return new Cycle(path);
}
