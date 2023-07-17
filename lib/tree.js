import fs from "fs";
import path from "path";
class Tree {
  constructor(path) {
    const originDependicy = this.getCycle(path);
    this.originDependicy = originDependicy;
    for (let key in originDependicy) {
      // 调用 searchFolder 函数，传入要搜索的文件夹路径和目标字符串
      const folderPath = "./node_modules"; // 替换为实际的文件夹路径
      const searchString = key; // 替换为目标字符串
      this.searchFolder(folderPath, searchString);
    }
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
      const filteredDependencies = Object.fromEntries(
        Object.entries(dependencies_all).filter(([key]) => !key.startsWith("@"))
      );
      return filteredDependencies;
    }
    return null;
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
              fs.readFile(packageJsonPath, "utf8", (err, data) => {
                if (err) {
                  console.error("Error reading package.json:", err);
                  return;
                }

                const packageJson = JSON.parse(data);
                console.log("Found matching folder:", filePath);
                console.log("Package.json contents:", packageJson);
              });
            }
          });
        });
      });
    };




}

export function tree(path) {
  return new Tree(path);
}
