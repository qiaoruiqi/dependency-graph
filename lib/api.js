import fs from "fs";
import path from "path";
import {cycle} from './cycle.js'
class Madge {
  constructor(path, config) {
		cycle(path);
  }
  /**
   * 获得初始的节点
   * @param {String} path
   */

}

export function madge(path, config) {
  return new Madge(path, config);
}
