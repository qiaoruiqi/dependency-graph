import fs from "fs";
import path from "path";
import {tree} from './tree.js'
class Madge {
  constructor(path, config) {
		tree(path);
  }
  /**
   * 获得初始的节点
   * @param {String} path
   */

}

export function madge(path, config) {
  return new Madge(path, config);
}
