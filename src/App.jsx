import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import   LinePlot  from './components/Graph';
function App() {
  const [count, setCount] = useState(0)
  const chartData = {
    svgNode: null,
    scales: null
  };
  const data ={
    graph: [
      {
        source: "commander",
        target: "eslint",
        type: 1,
      },
      {
        source: "eslint",
        target: "ajv",
        type: 1,
      },
      {
        source: "ajv",
        target: "fast-deep-equal",
        type: 1,
      },
      {
        source: "fast-deep-equal",
        target: "eslint",
        type: 1,
      },
      {
        source: "fast-deep-equal",
        target: "react",
        type: 1,
      },
      {
        source: "react",
        target: "loose-envify",
        type: 1,
      },
      {
        source: "loose-envify",
        target: "js-tokens",
        type: 1,
      },
      {
        source: "fast-deep-equal",
        target: "typescript",
        type: 2,
      },
      {
        source: "typescript",
        target: "chalk",
        type: 2,
      },
      {
        source: "chalk",
        target: "ansi-styles",
        type: 2,
      },
      {
        source: "ansi-styles",
        target: "color-convert",
        type: 2,
      },
      {
        source: "color-convert",
        target: "color-name",
        type: 2,
      },
      {
        source: "color-convert",
        target: "chalk",
        type: 3,
      },
      {
        source: "chalk",
        target: "escape-string-regexp",
        type: 3,
      },
      {
        source: "chalk",
        target: "supports-color",
        type: 4,
      },
      {
        source: "supports-color",
        target: "has-flag",
        type: 4,
      },
      {
        source: "supports-color",
        target: "import-fresh",
        type: 5,
      },
      {
        source: "import-fresh",
        target: "parent-module",
        type: 5,
      },
      {
        source: "parent-module",
        target: "callsites",
        type: 5,
      },
      {
        source: "import-fresh",
        target: "resolve-from",
        type: 6,
      },
      {
        source: "chalk",
        target: "import-fresh",
        type: 5,
      },
      {
        source: "chalk",
        target: "resolve-from",
        type: 5,
      },
      {
        source: "chalk",
        target: "typescript",
        type: 5,
      },
      {
        source: "typescript",
        target: "esbuild",
        type: 3,
      },
      {
        source: "typescript",
        target: "eslint",
        type: 4,
      },
      {
        source: "typescript",
        target: "glob",
        type: 4,
      },
      {
        source: "glob",
        target: "fs.realpath",
        type: 4,
      },
      {
        source: "glob",
        target: "inflight",
        type: 5,
      },
      {
        source: "inflight",
        target: "once",
        type: 5,
      },
      {
        source: "once",
        target: "wrappy",
        type: 5,
      },
      {
        source: "inflight",
        target: "wrappy",
        type: 6,
      },
      {
        source: "glob",
        target: "inherits",
        type: 6,
      },
      {
        source: "glob",
        target: "minimatch",
        type: 7,
      },
      {
        source: "minimatch",
        target: "brace-expansion",
        type: 7,
      },
      {
        source: "brace-expansion",
        target: "balanced-match",
        type: 7,
      },
      {
        source: "brace-expansion",
        target: "concat-map",
        type: 8,
      },
      {
        source: "glob",
        target: "once",
        type: 8,
      },
      {
        source: "glob",
        target: "path-is-absolute",
        type: 8,
      },
      {
        source: "glob",
        target: "rimraf",
        type: 9,
      },
      {
        source: "rimraf",
        target: "glob",
        type: 9,
      },
      {
        source: "typescript",
        target: "ms",
        type: 5,
      },
      {
        source: "ms",
        target: "eslint",
        type: 5,
      },
      {
        source: "typescript",
        target: "tslib",
        type: 6,
      },
      {
        source: "typescript",
        target: "typescript",
        type: 7,
      },
      {
        source: "typescript",
        target: "which",
        type: 7,
      },
      {
        source: "which",
        target: "isexe",
        type: 7,
      },
      {
        source: "isexe",
        target: "rimraf",
        type: 7,
      },
      {
        source: "which",
        target: "rimraf",
        type: 8,
      },
      {
        source: "ajv",
        target: "fast-json-stable-stringify",
        type: 2,
      },
      {
        source: "fast-json-stable-stringify",
        target: "eslint",
        type: 2,
      },
      {
        source: "ajv",
        target: "json-schema-traverse",
        type: 3,
      },
      {
        source: "json-schema-traverse",
        target: "eslint",
        type: 3,
      },
      {
        source: "ajv",
        target: "uri-js",
        type: 4,
      },
      {
        source: "uri-js",
        target: "punycode",
        type: 4,
      },
      {
        source: "uri-js",
        target: "rollup",
        type: 5,
      },
      {
        source: "rollup",
        target: "acorn",
        type: 5,
      },
      {
        source: "rollup",
        target: "acorn-jsx",
        type: 6,
      },
      {
        source: "acorn-jsx",
        target: "acorn",
        type: 6,
      },
      {
        source: "rollup",
        target: "eslint",
        type: 7,
      },
      {
        source: "rollup",
        target: "rollup",
        type: 7,
      },
      {
        source: "rollup",
        target: "semver",
        type: 7,
      },
      {
        source: "semver",
        target: "lru-cache",
        type: 7,
      },
      {
        source: "lru-cache",
        target: "yallist",
        type: 7,
      },
      {
        source: "rollup",
        target: "tslib",
        type: 8,
      },
      {
        source: "rollup",
        target: "typescript",
        type: 8,
      },
      {
        source: "uri-js",
        target: "typescript",
        type: 6,
      },
      {
        source: "ajv",
        target: "eslint",
        type: 5,
      },
      {
        source: "ajv",
        target: "glob",
        type: 5,
      },
      {
        source: "ajv",
        target: "typescript",
        type: 5,
      },
      {
        source: "eslint",
        target: "chalk",
        type: 2,
      },
      {
        source: "eslint",
        target: "cross-spawn",
        type: 2,
      },
      {
        source: "cross-spawn",
        target: "path-key",
        type: 2,
      },
      {
        source: "cross-spawn",
        target: "shebang-command",
        type: 3,
      },
      {
        source: "shebang-command",
        target: "shebang-regex",
        type: 3,
      },
      {
        source: "cross-spawn",
        target: "which",
        type: 4,
      },
      {
        source: "cross-spawn",
        target: "eslint",
        type: 4,
      },
      {
        source: "cross-spawn",
        target: "rimraf",
        type: 4,
      },
      {
        source: "eslint",
        target: "debug",
        type: 3,
      },
      {
        source: "debug",
        target: "ms",
        type: 3,
      },
      {
        source: "eslint",
        target: "doctrine",
        type: 4,
      },
      {
        source: "doctrine",
        target: "esutils",
        type: 4,
      },
      {
        source: "doctrine",
        target: "eslint",
        type: 5,
      },
      {
        source: "doctrine",
        target: "semver",
        type: 5,
      },
      {
        source: "eslint",
        target: "escape-string-regexp",
        type: 5,
      },
      {
        source: "eslint",
        target: "eslint-scope",
        type: 5,
      },
      {
        source: "eslint-scope",
        target: "esrecurse",
        type: 5,
      },
      {
        source: "esrecurse",
        target: "estraverse",
        type: 5,
      },
      {
        source: "estraverse",
        target: "espree",
        type: 5,
      },
      {
        source: "espree",
        target: "acorn",
        type: 5,
      },
      {
        source: "espree",
        target: "acorn-jsx",
        type: 5,
      },
      {
        source: "espree",
        target: "eslint-visitor-keys",
        type: 5,
      },
      {
        source: "eslint-visitor-keys",
        target: "eslint",
        type: 5,
      },
      {
        source: "eslint-visitor-keys",
        target: "esquery",
        type: 5,
      },
      {
        source: "esquery",
        target: "estraverse",
        type: 5,
      },
      {
        source: "esquery",
        target: "eslint",
        type: 5,
      },
      {
        source: "esquery",
        target: "rollup",
        type: 5,
      },
      {
        source: "eslint-visitor-keys",
        target: "opener",
        type: 6,
      },
      {
        source: "opener",
        target: "eslint",
        type: 6,
      },
      {
        source: "eslint-visitor-keys",
        target: "rollup",
        type: 7,
      },
      {
        source: "eslint-visitor-keys",
        target: "typescript",
        type: 7,
      },
      {
        source: "espree",
        target: "eslint",
        type: 6,
      },
      {
        source: "espree",
        target: "globals",
        type: 6,
      },
      {
        source: "espree",
        target: "rollup",
        type: 7,
      },
      {
        source: "eslint-scope",
        target: "estraverse",
        type: 6,
      },
      {
        source: "eslint-scope",
        target: "eslint",
        type: 6,
      },
      {
        source: "eslint-scope",
        target: "eslint-visitor-keys",
        type: 6,
      },
      {
        source: "eslint-scope",
        target: "espree",
        type: 6,
      },
      {
        source: "eslint-scope",
        target: "typescript",
        type: 6,
      },
      {
        source: "eslint",
        target: "eslint-visitor-keys",
        type: 6,
      },
      {
        source: "eslint",
        target: "espree",
        type: 6,
      },
      {
        source: "eslint",
        target: "esquery",
        type: 6,
      },
      {
        source: "eslint",
        target: "esutils",
        type: 6,
      },
      {
        source: "eslint",
        target: "fast-deep-equal",
        type: 6,
      },
      {
        source: "eslint",
        target: "file-entry-cache",
        type: 6,
      },
      {
        source: "file-entry-cache",
        target: "flat-cache",
        type: 6,
      },
      {
        source: "flat-cache",
        target: "flatted",
        type: 6,
      },
      {
        source: "flatted",
        target: "rollup",
        type: 6,
      },
      {
        source: "flat-cache",
        target: "rimraf",
        type: 7,
      },
      {
        source: "flat-cache",
        target: "eslint",
        type: 7,
      },
      {
        source: "file-entry-cache",
        target: "eslint",
        type: 7,
      },
      {
        source: "eslint",
        target: "find-up",
        type: 7,
      },
      {
        source: "find-up",
        target: "locate-path",
        type: 7,
      },
      {
        source: "locate-path",
        target: "p-locate",
        type: 7,
      },
      {
        source: "p-locate",
        target: "p-limit",
        type: 7,
      },
      {
        source: "p-limit",
        target: "yocto-queue",
        type: 7,
      },
      {
        source: "find-up",
        target: "path-exists",
        type: 8,
      },
      {
        source: "find-up",
        target: "is-path-inside",
        type: 9,
      },
      {
        source: "eslint",
        target: "glob-parent",
        type: 8,
      },
      {
        source: "glob-parent",
        target: "is-glob",
        type: 8,
      },
      {
        source: "is-glob",
        target: "is-extglob",
        type: 8,
      },
      {
        source: "glob-parent",
        target: "eslint",
        type: 9,
      },
      {
        source: "eslint",
        target: "globals",
        type: 9,
      },
      {
        source: "eslint",
        target: "graphemer",
        type: 9,
      },
      {
        source: "graphemer",
        target: "typescript",
        type: 9,
      },
      {
        source: "eslint",
        target: "ignore",
        type: 10,
      },
      {
        source: "ignore",
        target: "debug",
        type: 10,
      },
      {
        source: "ignore",
        target: "eslint",
        type: 10,
      },
      {
        source: "ignore",
        target: "rimraf",
        type: 10,
      },
      {
        source: "ignore",
        target: "typescript",
        type: 10,
      },
      {
        source: "eslint",
        target: "imurmurhash",
        type: 11,
      },
      {
        source: "eslint",
        target: "is-glob",
        type: 12,
      },
      {
        source: "eslint",
        target: "is-path-inside",
        type: 12,
      },
      {
        source: "eslint",
        target: "js-yaml",
        type: 12,
      },
      {
        source: "js-yaml",
        target: "argparse",
        type: 12,
      },
      {
        source: "argparse",
        target: "eslint",
        type: 12,
      },
      {
        source: "js-yaml",
        target: "eslint",
        type: 13,
      },
      {
        source: "js-yaml",
        target: "rollup",
        type: 13,
      },
      {
        source: "eslint",
        target: "json-stable-stringify-without-jsonify",
        type: 13,
      },
      {
        source: "eslint",
        target: "levn",
        type: 14,
      },
      {
        source: "levn",
        target: "prelude-ls",
        type: 14,
      },
      {
        source: "levn",
        target: "type-check",
        type: 15,
      },
      {
        source: "type-check",
        target: "prelude-ls",
        type: 15,
      },
      {
        source: "eslint",
        target: "lodash.merge",
        type: 15,
      },
      {
        source: "eslint",
        target: "minimatch",
        type: 16,
      },
      {
        source: "eslint",
        target: "natural-compare",
        type: 16,
      },
      {
        source: "eslint",
        target: "optionator",
        type: 17,
      },
      {
        source: "optionator",
        target: "prelude-ls",
        type: 17,
      },
      {
        source: "optionator",
        target: "deep-is",
        type: 17,
      },
      {
        source: "optionator",
        target: "type-check",
        type: 18,
      },
      {
        source: "optionator",
        target: "levn",
        type: 18,
      },
      {
        source: "optionator",
        target: "fast-levenshtein",
        type: 18,
      },
      {
        source: "fast-levenshtein",
        target: "lodash",
        type: 18,
      },
      {
        source: "eslint",
        target: "strip-ansi",
        type: 18,
      },
      {
        source: "strip-ansi",
        target: "ansi-regex",
        type: 18,
      },
      {
        source: "eslint",
        target: "text-table",
        type: 19,
      },
      {
        source: "eslint",
        target: "eslint",
        type: 20,
      },
      {
        source: "eslint",
        target: "fast-glob",
        type: 20,
      },
      {
        source: "fast-glob",
        target: "glob-parent",
        type: 20,
      },
      {
        source: "fast-glob",
        target: "merge2",
        type: 20,
      },
      {
        source: "fast-glob",
        target: "micromatch",
        type: 21,
      },
      {
        source: "micromatch",
        target: "braces",
        type: 21,
      },
      {
        source: "braces",
        target: "fill-range",
        type: 21,
      },
      {
        source: "fill-range",
        target: "to-regex-range",
        type: 21,
      },
      {
        source: "to-regex-range",
        target: "is-number",
        type: 21,
      },
      {
        source: "to-regex-range",
        target: "fill-range",
        type: 22,
      },
      {
        source: "to-regex-range",
        target: "text-table",
        type: 22,
      },
      {
        source: "micromatch",
        target: "picomatch",
        type: 22,
      },
      {
        source: "picomatch",
        target: "eslint",
        type: 22,
      },
      {
        source: "picomatch",
        target: "fill-range",
        type: 22,
      },
      {
        source: "micromatch",
        target: "fill-range",
        type: 23,
      },
      {
        source: "micromatch",
        target: "minimatch",
        type: 23,
      },
      {
        source: "fast-glob",
        target: "eslint",
        type: 22,
      },
      {
        source: "fast-glob",
        target: "fast-glob",
        type: 22,
      },
      {
        source: "fast-glob",
        target: "glob",
        type: 22,
      },
      {
        source: "fast-glob",
        target: "rimraf",
        type: 22,
      },
      {
        source: "fast-glob",
        target: "typescript",
        type: 22,
      },
      {
        source: "eslint",
        target: "glob",
        type: 21,
      },
      {
        source: "eslint",
        target: "semver",
        type: 21,
      },
      {
        source: "commander",
        target: "typescript",
        type: 2,
      },
      {
        source: "d3",
        target: "d3-array",
        type: 2,
      },
      {
        source: "d3-array",
        target: "internmap",
        type: 2,
      },
      {
        source: "internmap",
        target: "eslint",
        type: 2,
      },
      {
        source: "internmap",
        target: "rollup",
        type: 2,
      },
      {
        source: "d3-array",
        target: "d3-dsv",
        type: 3,
      },
      {
        source: "d3-dsv",
        target: "commander",
        type: 3,
      },
      {
        source: "d3-dsv",
        target: "iconv-lite",
        type: 3,
      },
      {
        source: "iconv-lite",
        target: "safer-buffer",
        type: 3,
      },
      {
        source: "iconv-lite",
        target: "semver",
        type: 4,
      },
      {
        source: "d3-dsv",
        target: "rw",
        type: 4,
      },
      {
        source: "rw",
        target: "eslint",
        type: 4,
      },
      {
        source: "d3-dsv",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-dsv",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3-array",
        target: "d3-random",
        type: 4,
      },
      {
        source: "d3-random",
        target: "d3-array",
        type: 4,
      },
      {
        source: "d3-random",
        target: "eslint",
        type: 4,
      },
      {
        source: "d3-random",
        target: "rollup",
        type: 4,
      },
      {
        source: "d3-array",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-array",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3",
        target: "d3-axis",
        type: 3,
      },
      {
        source: "d3-axis",
        target: "d3-scale",
        type: 3,
      },
      {
        source: "d3-scale",
        target: "d3-array",
        type: 3,
      },
      {
        source: "d3-scale",
        target: "d3-format",
        type: 3,
      },
      {
        source: "d3-format",
        target: "eslint",
        type: 3,
      },
      {
        source: "d3-format",
        target: "rollup",
        type: 3,
      },
      {
        source: "d3-scale",
        target: "d3-interpolate",
        type: 4,
      },
      {
        source: "d3-interpolate",
        target: "d3-color",
        type: 4,
      },
      {
        source: "d3-color",
        target: "eslint",
        type: 4,
      },
      {
        source: "d3-color",
        target: "rollup",
        type: 4,
      },
      {
        source: "d3-interpolate",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-interpolate",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3-scale",
        target: "d3-time",
        type: 5,
      },
      {
        source: "d3-time",
        target: "d3-array",
        type: 5,
      },
      {
        source: "d3-time",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-time",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3-scale",
        target: "d3-time-format",
        type: 6,
      },
      {
        source: "d3-time-format",
        target: "d3-time",
        type: 6,
      },
      {
        source: "d3-time-format",
        target: "eslint",
        type: 6,
      },
      {
        source: "d3-time-format",
        target: "rollup",
        type: 6,
      },
      {
        source: "d3-scale",
        target: "d3-color",
        type: 7,
      },
      {
        source: "d3-scale",
        target: "eslint",
        type: 7,
      },
      {
        source: "d3-scale",
        target: "rollup",
        type: 7,
      },
      {
        source: "d3-axis",
        target: "d3-selection",
        type: 4,
      },
      {
        source: "d3-selection",
        target: "eslint",
        type: 4,
      },
      {
        source: "d3-selection",
        target: "rollup",
        type: 4,
      },
      {
        source: "d3-axis",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-axis",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3",
        target: "d3-brush",
        type: 4,
      },
      {
        source: "d3-brush",
        target: "d3-dispatch",
        type: 4,
      },
      {
        source: "d3-dispatch",
        target: "eslint",
        type: 4,
      },
      {
        source: "d3-dispatch",
        target: "rollup",
        type: 4,
      },
      {
        source: "d3-brush",
        target: "d3-drag",
        type: 5,
      },
      {
        source: "d3-drag",
        target: "d3-dispatch",
        type: 5,
      },
      {
        source: "d3-drag",
        target: "d3-selection",
        type: 5,
      },
      {
        source: "d3-drag",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-drag",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3-brush",
        target: "d3-interpolate",
        type: 6,
      },
      {
        source: "d3-brush",
        target: "d3-selection",
        type: 6,
      },
      {
        source: "d3-brush",
        target: "d3-transition",
        type: 6,
      },
      {
        source: "d3-transition",
        target: "d3-color",
        type: 6,
      },
      {
        source: "d3-transition",
        target: "d3-dispatch",
        type: 6,
      },
      {
        source: "d3-transition",
        target: "d3-ease",
        type: 6,
      },
      {
        source: "d3-ease",
        target: "eslint",
        type: 6,
      },
      {
        source: "d3-ease",
        target: "rollup",
        type: 6,
      },
      {
        source: "d3-transition",
        target: "d3-interpolate",
        type: 7,
      },
      {
        source: "d3-transition",
        target: "d3-timer",
        type: 7,
      },
      {
        source: "d3-timer",
        target: "eslint",
        type: 7,
      },
      {
        source: "d3-timer",
        target: "rollup",
        type: 7,
      },
      {
        source: "d3-transition",
        target: "d3-selection",
        type: 8,
      },
      {
        source: "d3-transition",
        target: "eslint",
        type: 8,
      },
      {
        source: "d3-transition",
        target: "rollup",
        type: 8,
      },
      {
        source: "d3-brush",
        target: "eslint",
        type: 7,
      },
      {
        source: "d3-brush",
        target: "rollup",
        type: 7,
      },
      {
        source: "d3",
        target: "d3-chord",
        type: 5,
      },
      {
        source: "d3-chord",
        target: "d3-path",
        type: 5,
      },
      {
        source: "d3-path",
        target: "eslint",
        type: 5,
      },
      {
        source: "d3-path",
        target: "rollup",
        type: 5,
      },
      {
        source: "d3-chord",
        target: "eslint",
        type: 6,
      },
      {
        source: "d3-chord",
        target: "rollup",
        type: 6,
      },
      {
        source: "d3",
        target: "d3-color",
        type: 6,
      },
      {
        source: "d3",
        target: "d3-contour",
        type: 6,
      },
      {
        source: "d3-contour",
        target: "d3-array",
        type: 6,
      },
      {
        source: "d3-contour",
        target: "d3-axis",
        type: 6,
      },
      {
        source: "d3-contour",
        target: "d3-dsv",
        type: 6,
      },
      {
        source: "d3-contour",
        target: "d3-fetch",
        type: 6,
      },
      {
        source: "d3-fetch",
        target: "d3-dsv",
        type: 6,
      },
      {
        source: "d3-fetch",
        target: "eslint",
        type: 6,
      },
      {
        source: "d3-fetch",
        target: "rollup",
        type: 6,
      },
      {
        source: "d3-contour",
        target: "d3-geo",
        type: 7,
      },
      {
        source: "d3-geo",
        target: "d3-array",
        type: 7,
      },
      {
        source: "d3-geo",
        target: "d3-format",
        type: 7,
      },
      {
        source: "d3-geo",
        target: "eslint",
        type: 7,
      },
      {
        source: "d3-geo",
        target: "rollup",
        type: 7,
      },
      {
        source: "d3-contour",
        target: "d3-polygon",
        type: 8,
      },
      {
        source: "d3-polygon",
        target: "eslint",
        type: 8,
      },
      {
        source: "d3-polygon",
        target: "rollup",
        type: 8,
      },
      {
        source: "d3-contour",
        target: "d3-scale",
        type: 9,
      },
      {
        source: "d3-contour",
        target: "d3-selection",
        type: 9,
      },
      {
        source: "d3-contour",
        target: "eslint",
        type: 9,
      },
      {
        source: "d3-contour",
        target: "rollup",
        type: 9,
      },
      {
        source: "d3",
        target: "d3-delaunay",
        type: 7,
      },
      {
        source: "d3-delaunay",
        target: "delaunator",
        type: 7,
      },
      {
        source: "delaunator",
        target: "robust-predicates",
        type: 7,
      },
      {
        source: "robust-predicates",
        target: "eslint",
        type: 7,
      },
      {
        source: "robust-predicates",
        target: "rollup",
        type: 7,
      },
      {
        source: "delaunator",
        target: "eslint",
        type: 8,
      },
      {
        source: "delaunator",
        target: "rollup",
        type: 8,
      },
      {
        source: "d3-delaunay",
        target: "eslint",
        type: 8,
      },
      {
        source: "d3-delaunay",
        target: "rollup",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-dispatch",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-drag",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-dsv",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-ease",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-fetch",
        type: 8,
      },
      {
        source: "d3",
        target: "d3-force",
        type: 8,
      },
      {
        source: "d3-force",
        target: "d3-dispatch",
        type: 8,
      },
      {
        source: "d3-force",
        target: "d3-quadtree",
        type: 8,
      },
      {
        source: "d3-quadtree",
        target: "d3-array",
        type: 8,
      },
      {
        source: "d3-quadtree",
        target: "eslint",
        type: 8,
      },
      {
        source: "d3-quadtree",
        target: "rollup",
        type: 8,
      },
      {
        source: "d3-force",
        target: "d3-timer",
        type: 9,
      },
      {
        source: "d3-force",
        target: "eslint",
        type: 9,
      },
      {
        source: "d3-force",
        target: "rollup",
        type: 9,
      },
      {
        source: "d3",
        target: "d3-format",
        type: 9,
      },
      {
        source: "d3",
        target: "d3-geo",
        type: 9,
      },
      {
        source: "d3",
        target: "d3-hierarchy",
        type: 9,
      },
      {
        source: "d3-hierarchy",
        target: "d3-array",
        type: 9,
      },
      {
        source: "d3-hierarchy",
        target: "d3-dsv",
        type: 9,
      },
      {
        source: "d3-hierarchy",
        target: "d3-random",
        type: 9,
      },
      {
        source: "d3-hierarchy",
        target: "eslint",
        type: 9,
      },
      {
        source: "d3-hierarchy",
        target: "rollup",
        type: 9,
      },
      {
        source: "d3",
        target: "d3-interpolate",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-path",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-polygon",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-quadtree",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-random",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-scale",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-scale-chromatic",
        type: 10,
      },
      {
        source: "d3-scale-chromatic",
        target: "d3-color",
        type: 10,
      },
      {
        source: "d3-scale-chromatic",
        target: "d3-interpolate",
        type: 10,
      },
      {
        source: "d3-scale-chromatic",
        target: "eslint",
        type: 10,
      },
      {
        source: "d3-scale-chromatic",
        target: "rollup",
        type: 10,
      },
      {
        source: "d3",
        target: "d3-selection",
        type: 11,
      },
      {
        source: "d3",
        target: "d3-shape",
        type: 11,
      },
      {
        source: "d3-shape",
        target: "d3-path",
        type: 11,
      },
      {
        source: "d3-shape",
        target: "d3-polygon",
        type: 11,
      },
      {
        source: "d3-shape",
        target: "eslint",
        type: 11,
      },
      {
        source: "d3-shape",
        target: "rollup",
        type: 11,
      },
      {
        source: "d3",
        target: "d3-time",
        type: 12,
      },
      {
        source: "d3",
        target: "d3-time-format",
        type: 12,
      },
      {
        source: "d3",
        target: "d3-timer",
        type: 12,
      },
      {
        source: "d3",
        target: "d3-transition",
        type: 12,
      },
      {
        source: "d3",
        target: "d3-zoom",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "d3-dispatch",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "d3-drag",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "d3-interpolate",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "d3-selection",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "d3-transition",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "eslint",
        type: 12,
      },
      {
        source: "d3-zoom",
        target: "rollup",
        type: 12,
      },
      {
        source: "d3",
        target: "eslint",
        type: 13,
      },
      {
        source: "d3",
        target: "rollup",
        type: 13,
      },
      {
        source: "react-dom",
        target: "loose-envify",
        type: 4,
      },
      {
        source: "react-dom",
        target: "scheduler",
        type: 4,
      },
      {
        source: "scheduler",
        target: "loose-envify",
        type: 4,
      },
      {
        source: "util",
        target: "inherits",
        type: 5,
      },
      {
        source: "util",
        target: "is-arguments",
        type: 5,
      },
      {
        source: "is-arguments",
        target: "call-bind",
        type: 5,
      },
      {
        source: "call-bind",
        target: "function-bind",
        type: 5,
      },
      {
        source: "function-bind",
        target: "eslint",
        type: 5,
      },
      {
        source: "call-bind",
        target: "get-intrinsic",
        type: 6,
      },
      {
        source: "get-intrinsic",
        target: "function-bind",
        type: 6,
      },
      {
        source: "get-intrinsic",
        target: "has",
        type: 6,
      },
      {
        source: "has",
        target: "function-bind",
        type: 6,
      },
      {
        source: "has",
        target: "eslint",
        type: 6,
      },
      {
        source: "get-intrinsic",
        target: "has-proto",
        type: 7,
      },
      {
        source: "has-proto",
        target: "eslint",
        type: 7,
      },
      {
        source: "get-intrinsic",
        target: "has-symbols",
        type: 8,
      },
      {
        source: "has-symbols",
        target: "eslint",
        type: 8,
      },
      {
        source: "get-intrinsic",
        target: "call-bind",
        type: 9,
      },
      {
        source: "get-intrinsic",
        target: "eslint",
        type: 9,
      },
      {
        source: "get-intrinsic",
        target: "for-each",
        type: 9,
      },
      {
        source: "for-each",
        target: "is-callable",
        type: 9,
      },
      {
        source: "is-callable",
        target: "available-typed-arrays",
        type: 9,
      },
      {
        source: "available-typed-arrays",
        target: "eslint",
        type: 9,
      },
      {
        source: "is-callable",
        target: "eslint",
        type: 10,
      },
      {
        source: "is-callable",
        target: "for-each",
        type: 10,
      },
      {
        source: "is-callable",
        target: "has-tostringtag",
        type: 10,
      },
      {
        source: "has-tostringtag",
        target: "has-symbols",
        type: 10,
      },
      {
        source: "has-tostringtag",
        target: "eslint",
        type: 10,
      },
      {
        source: "is-callable",
        target: "rimraf",
        type: 11,
      },
      {
        source: "for-each",
        target: "eslint",
        type: 10,
      },
      {
        source: "get-intrinsic",
        target: "gopd",
        type: 10,
      },
      {
        source: "gopd",
        target: "get-intrinsic",
        type: 10,
      },
      {
        source: "gopd",
        target: "eslint",
        type: 10,
      },
      {
        source: "call-bind",
        target: "eslint",
        type: 7,
      },
      {
        source: "is-arguments",
        target: "has-tostringtag",
        type: 6,
      },
      {
        source: "is-arguments",
        target: "eslint",
        type: 6,
      },
      {
        source: "util",
        target: "is-generator-function",
        type: 6,
      },
      {
        source: "is-generator-function",
        target: "has-tostringtag",
        type: 6,
      },
      {
        source: "is-generator-function",
        target: "eslint",
        type: 6,
      },
      {
        source: "util",
        target: "is-typed-array",
        type: 7,
      },
      {
        source: "is-typed-array",
        target: "which-typed-array",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "available-typed-arrays",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "call-bind",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "for-each",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "gopd",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "has-tostringtag",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "eslint",
        type: 7,
      },
      {
        source: "which-typed-array",
        target: "is-callable",
        type: 7,
      },
      {
        source: "is-typed-array",
        target: "eslint",
        type: 8,
      },
      {
        source: "is-typed-array",
        target: "for-each",
        type: 8,
      },
      {
        source: "is-typed-array",
        target: "has-tostringtag",
        type: 8,
      },
      {
        source: "is-typed-array",
        target: "is-callable",
        type: 8,
      },
      {
        source: "util",
        target: "which-typed-array",
        type: 8,
      },
      {
        source: "vite",
        target: "esbuild",
        type: 8,
      },
      {
        source: "vite",
        target: "postcss",
        type: 8,
      },
      {
        source: "postcss",
        target: "nanoid",
        type: 8,
      },
      {
        source: "postcss",
        target: "picocolors",
        type: 9,
      },
      {
        source: "postcss",
        target: "source-map-js",
        type: 10,
      },
      {
        source: "vite",
        target: "rollup",
        type: 9,
      },
      {
        source: "vite",
        target: "acorn",
        type: 9,
      },
      {
        source: "vite",
        target: "convert-source-map",
        type: 9,
      },
      {
        source: "vite",
        target: "cross-spawn",
        type: 10,
      },
      {
        source: "vite",
        target: "debug",
        type: 10,
      },
      {
        source: "vite",
        target: "fast-glob",
        type: 10,
      },
      {
        source: "vite",
        target: "micromatch",
        type: 10,
      },
      {
        source: "vite",
        target: "picocolors",
        type: 10,
      },
      {
        source: "vite",
        target: "picomatch",
        type: 10,
      },
      {
        source: "vite",
        target: "strip-ansi",
        type: 10,
      },
      {
        source: "vite",
        target: "tslib",
        type: 10,
      },
    ],
    nodeArray: [
      {
        id: "commander",
        weight: 1,
        type: 1,
      },
      {
        id: "eslint",
        weight: 0.5,
        type: 1,
      },
      {
        id: "ajv",
        weight: 0.3333333333333333,
        type: 1,
      },
      {
        id: "fast-deep-equal",
        weight: 0.25,
        type: 1,
      },
      {
        id: "react",
        weight: 0.2,
        type: 1,
      },
      {
        id: "loose-envify",
        weight: 0.16666666666666666,
        type: 1,
      },
      {
        id: "js-tokens",
        weight: 0.14285714285714285,
        type: 1,
      },
      {
        id: "typescript",
        weight: 0.2,
        type: 2,
      },
      {
        id: "chalk",
        weight: 0.16666666666666666,
        type: 2,
      },
      {
        id: "ansi-styles",
        weight: 0.14285714285714285,
        type: 2,
      },
      {
        id: "color-convert",
        weight: 0.125,
        type: 2,
      },
      {
        id: "color-name",
        weight: 0.1111111111111111,
        type: 2,
      },
      {
        id: "escape-string-regexp",
        weight: 0.14285714285714285,
        type: 3,
      },
      {
        id: "supports-color",
        weight: 0.14285714285714285,
        type: 4,
      },
      {
        id: "has-flag",
        weight: 0.125,
        type: 4,
      },
      {
        id: "import-fresh",
        weight: 0.125,
        type: 5,
      },
      {
        id: "parent-module",
        weight: 0.1111111111111111,
        type: 5,
      },
      {
        id: "callsites",
        weight: 0.1,
        type: 5,
      },
      {
        id: "resolve-from",
        weight: 0.1111111111111111,
        type: 6,
      },
      {
        id: "esbuild",
        weight: 0.16666666666666666,
        type: 3,
      },
      {
        id: "glob",
        weight: 0.16666666666666666,
        type: 4,
      },
      {
        id: "fs.realpath",
        weight: 0.14285714285714285,
        type: 4,
      },
      {
        id: "inflight",
        weight: 0.14285714285714285,
        type: 5,
      },
      {
        id: "once",
        weight: 0.125,
        type: 5,
      },
      {
        id: "wrappy",
        weight: 0.1111111111111111,
        type: 5,
      },
      {
        id: "inherits",
        weight: 0.14285714285714285,
        type: 6,
      },
      {
        id: "minimatch",
        weight: 0.14285714285714285,
        type: 7,
      },
      {
        id: "brace-expansion",
        weight: 0.125,
        type: 7,
      },
      {
        id: "balanced-match",
        weight: 0.1111111111111111,
        type: 7,
      },
      {
        id: "concat-map",
        weight: 0.1111111111111111,
        type: 8,
      },
      {
        id: "path-is-absolute",
        weight: 0.14285714285714285,
        type: 8,
      },
      {
        id: "rimraf",
        weight: 0.14285714285714285,
        type: 9,
      },
      {
        id: "ms",
        weight: 0.16666666666666666,
        type: 5,
      },
      {
        id: "tslib",
        weight: 0.16666666666666666,
        type: 6,
      },
      {
        id: "which",
        weight: 0.16666666666666666,
        type: 7,
      },
      {
        id: "isexe",
        weight: 0.14285714285714285,
        type: 7,
      },
      {
        id: "fast-json-stable-stringify",
        weight: 0.25,
        type: 2,
      },
      {
        id: "json-schema-traverse",
        weight: 0.25,
        type: 3,
      },
      {
        id: "uri-js",
        weight: 0.25,
        type: 4,
      },
      {
        id: "punycode",
        weight: 0.2,
        type: 4,
      },
      {
        id: "rollup",
        weight: 0.2,
        type: 5,
      },
      {
        id: "acorn",
        weight: 0.16666666666666666,
        type: 5,
      },
      {
        id: "acorn-jsx",
        weight: 0.16666666666666666,
        type: 6,
      },
      {
        id: "semver",
        weight: 0.16666666666666666,
        type: 7,
      },
      {
        id: "lru-cache",
        weight: 0.14285714285714285,
        type: 7,
      },
      {
        id: "yallist",
        weight: 0.125,
        type: 7,
      },
      {
        id: "cross-spawn",
        weight: 0.3333333333333333,
        type: 2,
      },
      {
        id: "path-key",
        weight: 0.25,
        type: 2,
      },
      {
        id: "shebang-command",
        weight: 0.25,
        type: 3,
      },
      {
        id: "shebang-regex",
        weight: 0.2,
        type: 3,
      },
      {
        id: "debug",
        weight: 0.3333333333333333,
        type: 3,
      },
      {
        id: "doctrine",
        weight: 0.3333333333333333,
        type: 4,
      },
      {
        id: "esutils",
        weight: 0.25,
        type: 4,
      },
      {
        id: "eslint-scope",
        weight: 0.3333333333333333,
        type: 5,
      },
      {
        id: "esrecurse",
        weight: 0.25,
        type: 5,
      },
      {
        id: "estraverse",
        weight: 0.2,
        type: 5,
      },
      {
        id: "espree",
        weight: 0.16666666666666666,
        type: 5,
      },
      {
        id: "eslint-visitor-keys",
        weight: 0.14285714285714285,
        type: 5,
      },
      {
        id: "esquery",
        weight: 0.125,
        type: 5,
      },
      {
        id: "opener",
        weight: 0.125,
        type: 6,
      },
      {
        id: "globals",
        weight: 0.14285714285714285,
        type: 6,
      },
      {
        id: "file-entry-cache",
        weight: 0.3333333333333333,
        type: 6,
      },
      {
        id: "flat-cache",
        weight: 0.25,
        type: 6,
      },
      {
        id: "flatted",
        weight: 0.2,
        type: 6,
      },
      {
        id: "find-up",
        weight: 0.3333333333333333,
        type: 7,
      },
      {
        id: "locate-path",
        weight: 0.25,
        type: 7,
      },
      {
        id: "p-locate",
        weight: 0.2,
        type: 7,
      },
      {
        id: "p-limit",
        weight: 0.16666666666666666,
        type: 7,
      },
      {
        id: "yocto-queue",
        weight: 0.14285714285714285,
        type: 7,
      },
      {
        id: "path-exists",
        weight: 0.25,
        type: 8,
      },
      {
        id: "is-path-inside",
        weight: 0.25,
        type: 9,
      },
      {
        id: "glob-parent",
        weight: 0.3333333333333333,
        type: 8,
      },
      {
        id: "is-glob",
        weight: 0.25,
        type: 8,
      },
      {
        id: "is-extglob",
        weight: 0.2,
        type: 8,
      },
      {
        id: "graphemer",
        weight: 0.3333333333333333,
        type: 9,
      },
      {
        id: "ignore",
        weight: 0.3333333333333333,
        type: 10,
      },
      {
        id: "imurmurhash",
        weight: 0.3333333333333333,
        type: 11,
      },
      {
        id: "js-yaml",
        weight: 0.3333333333333333,
        type: 12,
      },
      {
        id: "argparse",
        weight: 0.25,
        type: 12,
      },
      {
        id: "json-stable-stringify-without-jsonify",
        weight: 0.3333333333333333,
        type: 13,
      },
      {
        id: "levn",
        weight: 0.3333333333333333,
        type: 14,
      },
      {
        id: "prelude-ls",
        weight: 0.25,
        type: 14,
      },
      {
        id: "type-check",
        weight: 0.25,
        type: 15,
      },
      {
        id: "lodash.merge",
        weight: 0.3333333333333333,
        type: 15,
      },
      {
        id: "natural-compare",
        weight: 0.3333333333333333,
        type: 16,
      },
      {
        id: "optionator",
        weight: 0.3333333333333333,
        type: 17,
      },
      {
        id: "deep-is",
        weight: 0.25,
        type: 17,
      },
      {
        id: "fast-levenshtein",
        weight: 0.25,
        type: 18,
      },
      {
        id: "lodash",
        weight: 0.2,
        type: 18,
      },
      {
        id: "strip-ansi",
        weight: 0.3333333333333333,
        type: 18,
      },
      {
        id: "ansi-regex",
        weight: 0.25,
        type: 18,
      },
      {
        id: "text-table",
        weight: 0.3333333333333333,
        type: 19,
      },
      {
        id: "fast-glob",
        weight: 0.3333333333333333,
        type: 20,
      },
      {
        id: "merge2",
        weight: 0.25,
        type: 20,
      },
      {
        id: "micromatch",
        weight: 0.25,
        type: 21,
      },
      {
        id: "braces",
        weight: 0.2,
        type: 21,
      },
      {
        id: "fill-range",
        weight: 0.16666666666666666,
        type: 21,
      },
      {
        id: "to-regex-range",
        weight: 0.14285714285714285,
        type: 21,
      },
      {
        id: "is-number",
        weight: 0.125,
        type: 21,
      },
      {
        id: "picomatch",
        weight: 0.2,
        type: 22,
      },
      {
        id: "d3",
        weight: 1,
        type: 2,
      },
      {
        id: "d3-array",
        weight: 0.5,
        type: 2,
      },
      {
        id: "internmap",
        weight: 0.3333333333333333,
        type: 2,
      },
      {
        id: "d3-dsv",
        weight: 0.3333333333333333,
        type: 3,
      },
      {
        id: "iconv-lite",
        weight: 0.25,
        type: 3,
      },
      {
        id: "safer-buffer",
        weight: 0.2,
        type: 3,
      },
      {
        id: "rw",
        weight: 0.25,
        type: 4,
      },
      {
        id: "d3-random",
        weight: 0.3333333333333333,
        type: 4,
      },
      {
        id: "d3-axis",
        weight: 0.5,
        type: 3,
      },
      {
        id: "d3-scale",
        weight: 0.3333333333333333,
        type: 3,
      },
      {
        id: "d3-format",
        weight: 0.25,
        type: 3,
      },
      {
        id: "d3-interpolate",
        weight: 0.25,
        type: 4,
      },
      {
        id: "d3-color",
        weight: 0.2,
        type: 4,
      },
      {
        id: "d3-time",
        weight: 0.25,
        type: 5,
      },
      {
        id: "d3-time-format",
        weight: 0.25,
        type: 6,
      },
      {
        id: "d3-selection",
        weight: 0.3333333333333333,
        type: 4,
      },
      {
        id: "d3-brush",
        weight: 0.5,
        type: 4,
      },
      {
        id: "d3-dispatch",
        weight: 0.3333333333333333,
        type: 4,
      },
      {
        id: "d3-drag",
        weight: 0.3333333333333333,
        type: 5,
      },
      {
        id: "d3-transition",
        weight: 0.3333333333333333,
        type: 6,
      },
      {
        id: "d3-ease",
        weight: 0.25,
        type: 6,
      },
      {
        id: "d3-timer",
        weight: 0.25,
        type: 7,
      },
      {
        id: "d3-chord",
        weight: 0.5,
        type: 5,
      },
      {
        id: "d3-path",
        weight: 0.3333333333333333,
        type: 5,
      },
      {
        id: "d3-contour",
        weight: 0.5,
        type: 6,
      },
      {
        id: "d3-fetch",
        weight: 0.3333333333333333,
        type: 6,
      },
      {
        id: "d3-geo",
        weight: 0.3333333333333333,
        type: 7,
      },
      {
        id: "d3-polygon",
        weight: 0.3333333333333333,
        type: 8,
      },
      {
        id: "d3-delaunay",
        weight: 0.5,
        type: 7,
      },
      {
        id: "delaunator",
        weight: 0.3333333333333333,
        type: 7,
      },
      {
        id: "robust-predicates",
        weight: 0.25,
        type: 7,
      },
      {
        id: "d3-force",
        weight: 0.5,
        type: 8,
      },
      {
        id: "d3-quadtree",
        weight: 0.3333333333333333,
        type: 8,
      },
      {
        id: "d3-hierarchy",
        weight: 0.5,
        type: 9,
      },
      {
        id: "d3-scale-chromatic",
        weight: 0.5,
        type: 10,
      },
      {
        id: "d3-shape",
        weight: 0.5,
        type: 11,
      },
      {
        id: "d3-zoom",
        weight: 0.5,
        type: 12,
      },
      {
        id: "loadash",
        weight: 1,
        type: 3,
      },
      {
        id: "react-dom",
        weight: 1,
        type: 4,
      },
      {
        id: "scheduler",
        weight: 0.5,
        type: 4,
      },
      {
        id: "util",
        weight: 1,
        type: 5,
      },
      {
        id: "is-arguments",
        weight: 0.5,
        type: 5,
      },
      {
        id: "call-bind",
        weight: 0.3333333333333333,
        type: 5,
      },
      {
        id: "function-bind",
        weight: 0.25,
        type: 5,
      },
      {
        id: "get-intrinsic",
        weight: 0.25,
        type: 6,
      },
      {
        id: "has",
        weight: 0.2,
        type: 6,
      },
      {
        id: "has-proto",
        weight: 0.2,
        type: 7,
      },
      {
        id: "has-symbols",
        weight: 0.2,
        type: 8,
      },
      {
        id: "for-each",
        weight: 0.2,
        type: 9,
      },
      {
        id: "is-callable",
        weight: 0.16666666666666666,
        type: 9,
      },
      {
        id: "available-typed-arrays",
        weight: 0.14285714285714285,
        type: 9,
      },
      {
        id: "has-tostringtag",
        weight: 0.14285714285714285,
        type: 10,
      },
      {
        id: "gopd",
        weight: 0.2,
        type: 10,
      },
      {
        id: "is-generator-function",
        weight: 0.5,
        type: 6,
      },
      {
        id: "is-typed-array",
        weight: 0.5,
        type: 7,
      },
      {
        id: "which-typed-array",
        weight: 0.3333333333333333,
        type: 7,
      },
      {
        id: "eslint-plugin-react-hooks",
        weight: 1,
        type: 6,
      },
      {
        id: "eslint-plugin-react-refresh",
        weight: 1,
        type: 7,
      },
      {
        id: "vite",
        weight: 1,
        type: 8,
      },
      {
        id: "postcss",
        weight: 0.5,
        type: 8,
      },
      {
        id: "nanoid",
        weight: 0.3333333333333333,
        type: 8,
      },
      {
        id: "picocolors",
        weight: 0.3333333333333333,
        type: 9,
      },
      {
        id: "source-map-js",
        weight: 0.3333333333333333,
        type: 10,
      },
      {
        id: "convert-source-map",
        weight: 0.5,
        type: 9,
      },
    ],
  }
  
  return (
    <>
      <LinePlot data={data}  />
    
    </>
  )
}

export default App
