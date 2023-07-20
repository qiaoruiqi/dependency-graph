
// 从指定的文件中读取数据
function readStatsFromFile(filename) {
  return parseChunked(fs.createReadStream(filename, { encoding: "utf8" }));
}
/**
 * 绘图数据源赋值
 * 需要区分是source还是target
 */
function convertDepToData(sourceNode, dependencies) {
  // 生成目标样式的数据
  // const dependencyArray = Object.entries(dependencies).map(
  //   ([dependency, version]) => ({
  //     source: source?`${dependency}@${version.replace("^", "")}`:null,
  //     target: target?`${dependency}@${version.replace("^", "")}`:null,
  //     type: null,
  //   })
  // );
  this.suits = [
    this.suits,
    ...Object.entries(dependencies).map(([dependency, version]) => ({
      source: sourceNode
        ? sourceNode
        : `${dependency}@${version.replace("^", "")}`,
      target: getTargetNode(dependency)
        ? `${dependency}@${version.replace("^", "")}`
        : null,
      type: null,
    })),
  ];
}
function getTargetNode(searchString) {
  if (searchFolder(folderPath, searchString) == null) return null;
}
/**
 *
 * @param {} folderPath
 * @param {*} searchString
 */
async function searchFolder(folderPath, searchString) {
  await fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    files = files.filter(
      (file) => !file.startsWith("@") && !file.startsWith(".")
    );
    files.forEach((file) => {
      if (file === searchString) {
        const filePath = path.join(folderPath, file);
        const bundleStatsFile = path.join(filePath, "package.json");
        const bundleStats = JSON.parse(
          fs.readFileSync(bundleStatsFile, "utf8")
        );
        if (getViewerData(bundleStats, null, searchString) == null) return null;
      }
    });
  });
}
