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
  const data = [
    {
      source: "commander",
      target: "eslint",
      type: 0,
    },
    {
      source: "eslint",
      target: "ajv",
      type: 0,
    },
    {
      source: "ajv",
      target: "fast-deep-equal",
      type: 0,
    },
    {
      source: "fast-deep-equal",
      target: "eslint",
      type: 0,
    },
    {
      source: "fast-deep-equal",
      target: "react",
      type: 0,
    },
    {
      source: "react",
      target: "loose-envify",
      type: 0,
    },
    {
      source: "loose-envify",
      target: "js-tokens",
      type: 0,
    },
    {
      source: "fast-deep-equal",
      target: "typescript",
      type: 1,
    },
    {
      source: "typescript",
      target: "chalk",
      type: 1,
    },
    {
      source: "chalk",
      target: "ansi-styles",
      type: 1,
    },
    {
      source: "ansi-styles",
      target: "color-convert",
      type: 1,
    },
    {
      source: "color-convert",
      target: "color-name",
      type: 1,
    },
    {
      source: "color-convert",
      target: "chalk",
      type: 2,
    },
    {
      source: "chalk",
      target: "escape-string-regexp",
      type: 2,
    },
    {
      source: "chalk",
      target: "supports-color",
      type: 3,
    },
    {
      source: "supports-color",
      target: "has-flag",
      type: 3,
    },
    {
      source: "supports-color",
      target: "import-fresh",
      type: 4,
    },
    {
      source: "import-fresh",
      target: "parent-module",
      type: 4,
    },
    {
      source: "parent-module",
      target: "callsites",
      type: 4,
    },
    {
      source: "import-fresh",
      target: "resolve-from",
      type: 5,
    },
    {
      source: "chalk",
      target: "import-fresh",
      type: 4,
    },
    {
      source: "chalk",
      target: "resolve-from",
      type: 4,
    },
    {
      source: "chalk",
      target: "typescript",
      type: 4,
    },
    {
      source: "typescript",
      target: "esbuild",
      type: 2,
    },
    {
      source: "typescript",
      target: "eslint",
      type: 3,
    },
    {
      source: "typescript",
      target: "glob",
      type: 3,
    },
    {
      source: "glob",
      target: "fs.realpath",
      type: 3,
    },
    {
      source: "glob",
      target: "inflight",
      type: 4,
    },
    {
      source: "inflight",
      target: "once",
      type: 4,
    },
    {
      source: "once",
      target: "wrappy",
      type: 4,
    },
    {
      source: "inflight",
      target: "wrappy",
      type: 5,
    },
    {
      source: "glob",
      target: "inherits",
      type: 5,
    },
    {
      source: "glob",
      target: "minimatch",
      type: 6,
    },
    {
      source: "minimatch",
      target: "brace-expansion",
      type: 6,
    },
    {
      source: "brace-expansion",
      target: "balanced-match",
      type: 6,
    },
    {
      source: "brace-expansion",
      target: "concat-map",
      type: 7,
    },
    {
      source: "glob",
      target: "once",
      type: 7,
    },
    {
      source: "glob",
      target: "path-is-absolute",
      type: 7,
    },
    {
      source: "glob",
      target: "rimraf",
      type: 8,
    },
    {
      source: "rimraf",
      target: "glob",
      type: 8,
    },
    {
      source: "typescript",
      target: "ms",
      type: 4,
    },
    {
      source: "ms",
      target: "eslint",
      type: 4,
    },
    {
      source: "typescript",
      target: "tslib",
      type: 5,
    },
    {
      source: "typescript",
      target: "typescript",
      type: 6,
    },
    {
      source: "typescript",
      target: "which",
      type: 6,
    },
    {
      source: "which",
      target: "isexe",
      type: 6,
    },
    {
      source: "isexe",
      target: "rimraf",
      type: 6,
    },
    {
      source: "which",
      target: "rimraf",
      type: 7,
    },
    {
      source: "ajv",
      target: "fast-json-stable-stringify",
      type: 1,
    },
    {
      source: "fast-json-stable-stringify",
      target: "eslint",
      type: 1,
    },
    {
      source: "ajv",
      target: "json-schema-traverse",
      type: 2,
    },
    {
      source: "json-schema-traverse",
      target: "eslint",
      type: 2,
    },
    {
      source: "ajv",
      target: "uri-js",
      type: 3,
    },
    {
      source: "uri-js",
      target: "punycode",
      type: 3,
    },
    {
      source: "uri-js",
      target: "rollup",
      type: 4,
    },
    {
      source: "rollup",
      target: "acorn",
      type: 4,
    },
    {
      source: "rollup",
      target: "acorn-jsx",
      type: 5,
    },
    {
      source: "acorn-jsx",
      target: "acorn",
      type: 5,
    },
    {
      source: "rollup",
      target: "eslint",
      type: 6,
    },
    {
      source: "rollup",
      target: "rollup",
      type: 6,
    },
    {
      source: "rollup",
      target: "semver",
      type: 6,
    },
    {
      source: "semver",
      target: "lru-cache",
      type: 6,
    },
    {
      source: "lru-cache",
      target: "yallist",
      type: 6,
    },
    {
      source: "rollup",
      target: "tslib",
      type: 7,
    },
    {
      source: "rollup",
      target: "typescript",
      type: 7,
    },
    {
      source: "uri-js",
      target: "typescript",
      type: 5,
    },
    {
      source: "ajv",
      target: "eslint",
      type: 4,
    },
    {
      source: "ajv",
      target: "glob",
      type: 4,
    },
    {
      source: "ajv",
      target: "typescript",
      type: 4,
    },
    {
      source: "eslint",
      target: "chalk",
      type: 1,
    },
    {
      source: "eslint",
      target: "cross-spawn",
      type: 1,
    },
    {
      source: "cross-spawn",
      target: "path-key",
      type: 1,
    },
    {
      source: "cross-spawn",
      target: "shebang-command",
      type: 2,
    },
    {
      source: "shebang-command",
      target: "shebang-regex",
      type: 2,
    },
    {
      source: "cross-spawn",
      target: "which",
      type: 3,
    },
    {
      source: "cross-spawn",
      target: "eslint",
      type: 3,
    },
    {
      source: "cross-spawn",
      target: "rimraf",
      type: 3,
    },
    {
      source: "eslint",
      target: "debug",
      type: 2,
    },
    {
      source: "debug",
      target: "ms",
      type: 2,
    },
    {
      source: "eslint",
      target: "doctrine",
      type: 3,
    },
    {
      source: "doctrine",
      target: "esutils",
      type: 3,
    },
    {
      source: "doctrine",
      target: "eslint",
      type: 4,
    },
    {
      source: "doctrine",
      target: "semver",
      type: 4,
    },
    {
      source: "eslint",
      target: "escape-string-regexp",
      type: 4,
    },
    {
      source: "eslint",
      target: "eslint-scope",
      type: 4,
    },
    {
      source: "eslint-scope",
      target: "esrecurse",
      type: 4,
    },
    {
      source: "esrecurse",
      target: "estraverse",
      type: 4,
    },
    {
      source: "estraverse",
      target: "espree",
      type: 4,
    },
    {
      source: "espree",
      target: "acorn",
      type: 4,
    },
    {
      source: "espree",
      target: "acorn-jsx",
      type: 4,
    },
    {
      source: "espree",
      target: "eslint-visitor-keys",
      type: 4,
    },
    {
      source: "eslint-visitor-keys",
      target: "eslint",
      type: 4,
    },
    {
      source: "eslint-visitor-keys",
      target: "esquery",
      type: 4,
    },
    {
      source: "esquery",
      target: "estraverse",
      type: 4,
    },
    {
      source: "esquery",
      target: "eslint",
      type: 4,
    },
    {
      source: "esquery",
      target: "rollup",
      type: 4,
    },
    {
      source: "eslint-visitor-keys",
      target: "opener",
      type: 5,
    },
    {
      source: "opener",
      target: "eslint",
      type: 5,
    },
    {
      source: "eslint-visitor-keys",
      target: "rollup",
      type: 6,
    },
    {
      source: "eslint-visitor-keys",
      target: "typescript",
      type: 6,
    },
    {
      source: "espree",
      target: "eslint",
      type: 5,
    },
    {
      source: "espree",
      target: "globals",
      type: 5,
    },
    {
      source: "espree",
      target: "rollup",
      type: 6,
    },
    {
      source: "eslint-scope",
      target: "estraverse",
      type: 5,
    },
    {
      source: "eslint-scope",
      target: "eslint",
      type: 5,
    },
    {
      source: "eslint-scope",
      target: "eslint-visitor-keys",
      type: 5,
    },
    {
      source: "eslint-scope",
      target: "espree",
      type: 5,
    },
    {
      source: "eslint-scope",
      target: "typescript",
      type: 5,
    },
    {
      source: "eslint",
      target: "eslint-visitor-keys",
      type: 5,
    },
    {
      source: "eslint",
      target: "espree",
      type: 5,
    },
    {
      source: "eslint",
      target: "esquery",
      type: 5,
    },
    {
      source: "eslint",
      target: "esutils",
      type: 5,
    },
    {
      source: "eslint",
      target: "fast-deep-equal",
      type: 5,
    },
    {
      source: "eslint",
      target: "file-entry-cache",
      type: 5,
    },
    {
      source: "file-entry-cache",
      target: "flat-cache",
      type: 5,
    },
    {
      source: "flat-cache",
      target: "flatted",
      type: 5,
    },
    {
      source: "flatted",
      target: "rollup",
      type: 5,
    },
    {
      source: "flat-cache",
      target: "rimraf",
      type: 6,
    },
    {
      source: "flat-cache",
      target: "eslint",
      type: 6,
    },
    {
      source: "file-entry-cache",
      target: "eslint",
      type: 6,
    },
    {
      source: "eslint",
      target: "find-up",
      type: 6,
    },
    {
      source: "find-up",
      target: "locate-path",
      type: 6,
    },
    {
      source: "locate-path",
      target: "p-locate",
      type: 6,
    },
    {
      source: "p-locate",
      target: "p-limit",
      type: 6,
    },
    {
      source: "p-limit",
      target: "yocto-queue",
      type: 6,
    },
    {
      source: "find-up",
      target: "path-exists",
      type: 7,
    },
    {
      source: "find-up",
      target: "is-path-inside",
      type: 8,
    },
    {
      source: "eslint",
      target: "glob-parent",
      type: 7,
    },
    {
      source: "glob-parent",
      target: "is-glob",
      type: 7,
    },
    {
      source: "is-glob",
      target: "is-extglob",
      type: 7,
    },
    {
      source: "glob-parent",
      target: "eslint",
      type: 8,
    },
    {
      source: "eslint",
      target: "globals",
      type: 8,
    },
    {
      source: "eslint",
      target: "graphemer",
      type: 8,
    },
    {
      source: "graphemer",
      target: "typescript",
      type: 8,
    },
    {
      source: "eslint",
      target: "ignore",
      type: 9,
    },
    {
      source: "ignore",
      target: "debug",
      type: 9,
    },
    {
      source: "ignore",
      target: "eslint",
      type: 9,
    },
    {
      source: "ignore",
      target: "rimraf",
      type: 9,
    },
    {
      source: "ignore",
      target: "typescript",
      type: 9,
    },
    {
      source: "eslint",
      target: "imurmurhash",
      type: 10,
    },
    {
      source: "eslint",
      target: "is-glob",
      type: 11,
    },
    {
      source: "eslint",
      target: "is-path-inside",
      type: 11,
    },
    {
      source: "eslint",
      target: "js-yaml",
      type: 11,
    },
    {
      source: "js-yaml",
      target: "argparse",
      type: 11,
    },
    {
      source: "argparse",
      target: "eslint",
      type: 11,
    },
    {
      source: "js-yaml",
      target: "eslint",
      type: 12,
    },
    {
      source: "js-yaml",
      target: "rollup",
      type: 12,
    },
    {
      source: "eslint",
      target: "json-stable-stringify-without-jsonify",
      type: 12,
    },
    {
      source: "eslint",
      target: "levn",
      type: 13,
    },
    {
      source: "levn",
      target: "prelude-ls",
      type: 13,
    },
    {
      source: "levn",
      target: "type-check",
      type: 14,
    },
    {
      source: "type-check",
      target: "prelude-ls",
      type: 14,
    },
    {
      source: "eslint",
      target: "lodash.merge",
      type: 14,
    },
    {
      source: "eslint",
      target: "minimatch",
      type: 15,
    },
    {
      source: "eslint",
      target: "natural-compare",
      type: 15,
    },
    {
      source: "eslint",
      target: "optionator",
      type: 16,
    },
    {
      source: "optionator",
      target: "prelude-ls",
      type: 16,
    },
    {
      source: "optionator",
      target: "deep-is",
      type: 16,
    },
    {
      source: "optionator",
      target: "type-check",
      type: 17,
    },
    {
      source: "optionator",
      target: "levn",
      type: 17,
    },
    {
      source: "optionator",
      target: "fast-levenshtein",
      type: 17,
    },
    {
      source: "fast-levenshtein",
      target: "lodash",
      type: 17,
    },
    {
      source: "eslint",
      target: "strip-ansi",
      type: 17,
    },
    {
      source: "strip-ansi",
      target: "ansi-regex",
      type: 17,
    },
    {
      source: "eslint",
      target: "text-table",
      type: 18,
    },
    {
      source: "eslint",
      target: "eslint",
      type: 19,
    },
    {
      source: "eslint",
      target: "fast-glob",
      type: 19,
    },
    {
      source: "fast-glob",
      target: "glob-parent",
      type: 19,
    },
    {
      source: "fast-glob",
      target: "merge2",
      type: 19,
    },
    {
      source: "fast-glob",
      target: "micromatch",
      type: 20,
    },
    {
      source: "micromatch",
      target: "braces",
      type: 20,
    },
    {
      source: "braces",
      target: "fill-range",
      type: 20,
    },
    {
      source: "fill-range",
      target: "to-regex-range",
      type: 20,
    },
    {
      source: "to-regex-range",
      target: "is-number",
      type: 20,
    },
    {
      source: "to-regex-range",
      target: "fill-range",
      type: 21,
    },
    {
      source: "to-regex-range",
      target: "text-table",
      type: 21,
    },
    {
      source: "micromatch",
      target: "picomatch",
      type: 21,
    },
    {
      source: "picomatch",
      target: "eslint",
      type: 21,
    },
    {
      source: "picomatch",
      target: "fill-range",
      type: 21,
    },
    {
      source: "micromatch",
      target: "fill-range",
      type: 22,
    },
    {
      source: "micromatch",
      target: "minimatch",
      type: 22,
    },
    {
      source: "fast-glob",
      target: "eslint",
      type: 21,
    },
    {
      source: "fast-glob",
      target: "fast-glob",
      type: 21,
    },
    {
      source: "fast-glob",
      target: "glob",
      type: 21,
    },
    {
      source: "fast-glob",
      target: "rimraf",
      type: 21,
    },
    {
      source: "fast-glob",
      target: "typescript",
      type: 21,
    },
    {
      source: "eslint",
      target: "glob",
      type: 20,
    },
    {
      source: "eslint",
      target: "semver",
      type: 20,
    },
    {
      source: "commander",
      target: "typescript",
      type: 1,
    },
    {
      source: "d3",
      target: "d3-array",
      type: 1,
    },
    {
      source: "d3-array",
      target: "eslint",
      type: 1,
    },
    {
      source: "d3-array",
      target: "rollup",
      type: 1,
    },
    {
      source: "d3",
      target: "d3-axis",
      type: 2,
    },
    {
      source: "d3-axis",
      target: "d3-scale",
      type: 2,
    },
    {
      source: "d3-scale",
      target: "d3-array",
      type: 2,
    },
    {
      source: "d3-scale",
      target: "d3-collection",
      type: 2,
    },
    {
      source: "d3-collection",
      target: "d3-array",
      type: 2,
    },
    {
      source: "d3-collection",
      target: "eslint",
      type: 2,
    },
    {
      source: "d3-collection",
      target: "rollup",
      type: 2,
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
      type: 3,
    },
    {
      source: "d3-selection",
      target: "eslint",
      type: 3,
    },
    {
      source: "d3-selection",
      target: "rollup",
      type: 3,
    },
    {
      source: "d3-axis",
      target: "eslint",
      type: 4,
    },
    {
      source: "d3-axis",
      target: "rollup",
      type: 4,
    },
    {
      source: "d3",
      target: "d3-brush",
      type: 3,
    },
    {
      source: "d3-brush",
      target: "d3-dispatch",
      type: 3,
    },
    {
      source: "d3-dispatch",
      target: "eslint",
      type: 3,
    },
    {
      source: "d3-dispatch",
      target: "rollup",
      type: 3,
    },
    {
      source: "d3-brush",
      target: "d3-drag",
      type: 4,
    },
    {
      source: "d3-drag",
      target: "d3-dispatch",
      type: 4,
    },
    {
      source: "d3-drag",
      target: "d3-selection",
      type: 4,
    },
    {
      source: "d3-drag",
      target: "eslint",
      type: 4,
    },
    {
      source: "d3-drag",
      target: "rollup",
      type: 4,
    },
    {
      source: "d3-brush",
      target: "d3-interpolate",
      type: 5,
    },
    {
      source: "d3-brush",
      target: "d3-selection",
      type: 5,
    },
    {
      source: "d3-brush",
      target: "d3-transition",
      type: 5,
    },
    {
      source: "d3-transition",
      target: "d3-color",
      type: 5,
    },
    {
      source: "d3-transition",
      target: "d3-dispatch",
      type: 5,
    },
    {
      source: "d3-transition",
      target: "d3-ease",
      type: 5,
    },
    {
      source: "d3-ease",
      target: "eslint",
      type: 5,
    },
    {
      source: "d3-ease",
      target: "rollup",
      type: 5,
    },
    {
      source: "d3-transition",
      target: "d3-interpolate",
      type: 6,
    },
    {
      source: "d3-transition",
      target: "d3-selection",
      type: 6,
    },
    {
      source: "d3-transition",
      target: "d3-timer",
      type: 6,
    },
    {
      source: "d3-timer",
      target: "eslint",
      type: 6,
    },
    {
      source: "d3-timer",
      target: "rollup",
      type: 6,
    },
    {
      source: "d3-transition",
      target: "eslint",
      type: 7,
    },
    {
      source: "d3-transition",
      target: "rollup",
      type: 7,
    },
    {
      source: "d3-brush",
      target: "eslint",
      type: 6,
    },
    {
      source: "d3-brush",
      target: "rollup",
      type: 6,
    },
    {
      source: "d3",
      target: "d3-chord",
      type: 4,
    },
    {
      source: "d3-chord",
      target: "d3-array",
      type: 4,
    },
    {
      source: "d3-chord",
      target: "d3-path",
      type: 4,
    },
    {
      source: "d3-path",
      target: "eslint",
      type: 4,
    },
    {
      source: "d3-path",
      target: "rollup",
      type: 4,
    },
    {
      source: "d3-chord",
      target: "eslint",
      type: 5,
    },
    {
      source: "d3-chord",
      target: "rollup",
      type: 5,
    },
    {
      source: "d3",
      target: "d3-collection",
      type: 5,
    },
    {
      source: "d3",
      target: "d3-color",
      type: 5,
    },
    {
      source: "d3",
      target: "d3-contour",
      type: 5,
    },
    {
      source: "d3-contour",
      target: "d3-array",
      type: 5,
    },
    {
      source: "d3-contour",
      target: "eslint",
      type: 5,
    },
    {
      source: "d3-contour",
      target: "rollup",
      type: 5,
    },
    {
      source: "d3",
      target: "d3-dispatch",
      type: 6,
    },
    {
      source: "d3",
      target: "d3-drag",
      type: 6,
    },
    {
      source: "d3",
      target: "d3-dsv",
      type: 6,
    },
    {
      source: "d3-dsv",
      target: "commander",
      type: 6,
    },
    {
      source: "d3-dsv",
      target: "iconv-lite",
      type: 6,
    },
    {
      source: "iconv-lite",
      target: "safer-buffer",
      type: 6,
    },
    {
      source: "iconv-lite",
      target: "semver",
      type: 7,
    },
    {
      source: "d3-dsv",
      target: "rw",
      type: 7,
    },
    {
      source: "rw",
      target: "eslint",
      type: 7,
    },
    {
      source: "d3-dsv",
      target: "eslint",
      type: 8,
    },
    {
      source: "d3-dsv",
      target: "rollup",
      type: 8,
    },
    {
      source: "d3",
      target: "d3-ease",
      type: 7,
    },
    {
      source: "d3",
      target: "d3-fetch",
      type: 7,
    },
    {
      source: "d3-fetch",
      target: "d3-dsv",
      type: 7,
    },
    {
      source: "d3-fetch",
      target: "eslint",
      type: 7,
    },
    {
      source: "d3-fetch",
      target: "rollup",
      type: 7,
    },
    {
      source: "d3",
      target: "d3-force",
      type: 8,
    },
    {
      source: "d3-force",
      target: "d3-collection",
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
      source: "d3-geo",
      target: "d3-array",
      type: 9,
    },
    {
      source: "d3-geo",
      target: "d3-format",
      type: 9,
    },
    {
      source: "d3-geo",
      target: "eslint",
      type: 9,
    },
    {
      source: "d3-geo",
      target: "rollup",
      type: 9,
    },
    {
      source: "d3",
      target: "d3-hierarchy",
      type: 10,
    },
    {
      source: "d3-hierarchy",
      target: "d3-array",
      type: 10,
    },
    {
      source: "d3-hierarchy",
      target: "d3-dsv",
      type: 10,
    },
    {
      source: "d3-hierarchy",
      target: "d3-random",
      type: 10,
    },
    {
      source: "d3-random",
      target: "d3-array",
      type: 10,
    },
    {
      source: "d3-random",
      target: "eslint",
      type: 10,
    },
    {
      source: "d3-random",
      target: "rollup",
      type: 10,
    },
    {
      source: "d3-hierarchy",
      target: "eslint",
      type: 11,
    },
    {
      source: "d3-hierarchy",
      target: "rollup",
      type: 11,
    },
    {
      source: "d3",
      target: "d3-interpolate",
      type: 11,
    },
    {
      source: "d3",
      target: "d3-path",
      type: 11,
    },
    {
      source: "d3",
      target: "d3-polygon",
      type: 11,
    },
    {
      source: "d3-polygon",
      target: "eslint",
      type: 11,
    },
    {
      source: "d3-polygon",
      target: "rollup",
      type: 11,
    },
    {
      source: "d3",
      target: "d3-quadtree",
      type: 12,
    },
    {
      source: "d3",
      target: "d3-random",
      type: 12,
    },
    {
      source: "d3",
      target: "d3-scale",
      type: 12,
    },
    {
      source: "d3",
      target: "d3-scale-chromatic",
      type: 12,
    },
    {
      source: "d3-scale-chromatic",
      target: "d3-color",
      type: 12,
    },
    {
      source: "d3-scale-chromatic",
      target: "d3-interpolate",
      type: 12,
    },
    {
      source: "d3-scale-chromatic",
      target: "eslint",
      type: 12,
    },
    {
      source: "d3-scale-chromatic",
      target: "rollup",
      type: 12,
    },
    {
      source: "d3",
      target: "d3-selection",
      type: 13,
    },
    {
      source: "d3",
      target: "d3-shape",
      type: 13,
    },
    {
      source: "d3-shape",
      target: "d3-path",
      type: 13,
    },
    {
      source: "d3-shape",
      target: "d3-polygon",
      type: 13,
    },
    {
      source: "d3-shape",
      target: "eslint",
      type: 13,
    },
    {
      source: "d3-shape",
      target: "rollup",
      type: 13,
    },
    {
      source: "d3",
      target: "d3-time",
      type: 14,
    },
    {
      source: "d3",
      target: "d3-time-format",
      type: 14,
    },
    {
      source: "d3",
      target: "d3-timer",
      type: 14,
    },
    {
      source: "d3",
      target: "d3-transition",
      type: 14,
    },
    {
      source: "d3",
      target: "d3-voronoi",
      type: 14,
    },
    {
      source: "d3-voronoi",
      target: "eslint",
      type: 14,
    },
    {
      source: "d3-voronoi",
      target: "rollup",
      type: 14,
    },
    {
      source: "d3",
      target: "d3-zoom",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "d3-dispatch",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "d3-drag",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "d3-interpolate",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "d3-selection",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "d3-transition",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "eslint",
      type: 15,
    },
    {
      source: "d3-zoom",
      target: "rollup",
      type: 15,
    },
    {
      source: "d3",
      target: "rimraf",
      type: 16,
    },
    {
      source: "d3",
      target: "rollup",
      type: 16,
    },
    {
      source: "react-dom",
      target: "loose-envify",
      type: 3,
    },
    {
      source: "react-dom",
      target: "scheduler",
      type: 3,
    },
    {
      source: "scheduler",
      target: "loose-envify",
      type: 3,
    },
    {
      source: "util",
      target: "inherits",
      type: 4,
    },
    {
      source: "util",
      target: "is-arguments",
      type: 4,
    },
    {
      source: "is-arguments",
      target: "call-bind",
      type: 4,
    },
    {
      source: "call-bind",
      target: "function-bind",
      type: 4,
    },
    {
      source: "function-bind",
      target: "eslint",
      type: 4,
    },
    {
      source: "call-bind",
      target: "get-intrinsic",
      type: 5,
    },
    {
      source: "get-intrinsic",
      target: "function-bind",
      type: 5,
    },
    {
      source: "get-intrinsic",
      target: "has",
      type: 5,
    },
    {
      source: "has",
      target: "function-bind",
      type: 5,
    },
    {
      source: "has",
      target: "eslint",
      type: 5,
    },
    {
      source: "get-intrinsic",
      target: "has-proto",
      type: 6,
    },
    {
      source: "has-proto",
      target: "eslint",
      type: 6,
    },
    {
      source: "get-intrinsic",
      target: "has-symbols",
      type: 7,
    },
    {
      source: "has-symbols",
      target: "eslint",
      type: 7,
    },
    {
      source: "get-intrinsic",
      target: "call-bind",
      type: 8,
    },
    {
      source: "get-intrinsic",
      target: "eslint",
      type: 8,
    },
    {
      source: "get-intrinsic",
      target: "for-each",
      type: 8,
    },
    {
      source: "for-each",
      target: "is-callable",
      type: 8,
    },
    {
      source: "is-callable",
      target: "available-typed-arrays",
      type: 8,
    },
    {
      source: "available-typed-arrays",
      target: "eslint",
      type: 8,
    },
    {
      source: "is-callable",
      target: "eslint",
      type: 9,
    },
    {
      source: "is-callable",
      target: "for-each",
      type: 9,
    },
    {
      source: "is-callable",
      target: "has-tostringtag",
      type: 9,
    },
    {
      source: "has-tostringtag",
      target: "has-symbols",
      type: 9,
    },
    {
      source: "has-tostringtag",
      target: "eslint",
      type: 9,
    },
    {
      source: "is-callable",
      target: "rimraf",
      type: 10,
    },
    {
      source: "for-each",
      target: "eslint",
      type: 9,
    },
    {
      source: "get-intrinsic",
      target: "gopd",
      type: 9,
    },
    {
      source: "gopd",
      target: "get-intrinsic",
      type: 9,
    },
    {
      source: "gopd",
      target: "eslint",
      type: 9,
    },
    {
      source: "call-bind",
      target: "eslint",
      type: 6,
    },
    {
      source: "is-arguments",
      target: "has-tostringtag",
      type: 5,
    },
    {
      source: "is-arguments",
      target: "eslint",
      type: 5,
    },
    {
      source: "util",
      target: "is-generator-function",
      type: 5,
    },
    {
      source: "is-generator-function",
      target: "has-tostringtag",
      type: 5,
    },
    {
      source: "is-generator-function",
      target: "eslint",
      type: 5,
    },
    {
      source: "util",
      target: "is-typed-array",
      type: 6,
    },
    {
      source: "is-typed-array",
      target: "which-typed-array",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "available-typed-arrays",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "call-bind",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "for-each",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "gopd",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "has-tostringtag",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "eslint",
      type: 6,
    },
    {
      source: "which-typed-array",
      target: "is-callable",
      type: 6,
    },
    {
      source: "is-typed-array",
      target: "eslint",
      type: 7,
    },
    {
      source: "is-typed-array",
      target: "for-each",
      type: 7,
    },
    {
      source: "is-typed-array",
      target: "has-tostringtag",
      type: 7,
    },
    {
      source: "is-typed-array",
      target: "is-callable",
      type: 7,
    },
    {
      source: "util",
      target: "which-typed-array",
      type: 7,
    },
    {
      source: "vite",
      target: "esbuild",
      type: 7,
    },
    {
      source: "vite",
      target: "postcss",
      type: 7,
    },
    {
      source: "postcss",
      target: "nanoid",
      type: 7,
    },
    {
      source: "postcss",
      target: "picocolors",
      type: 8,
    },
    {
      source: "postcss",
      target: "source-map-js",
      type: 9,
    },
    {
      source: "vite",
      target: "rollup",
      type: 8,
    },
    {
      source: "vite",
      target: "acorn",
      type: 8,
    },
    {
      source: "vite",
      target: "convert-source-map",
      type: 8,
    },
    {
      source: "vite",
      target: "cross-spawn",
      type: 9,
    },
    {
      source: "vite",
      target: "debug",
      type: 9,
    },
    {
      source: "vite",
      target: "fast-glob",
      type: 9,
    },
    {
      source: "vite",
      target: "micromatch",
      type: 9,
    },
    {
      source: "vite",
      target: "picocolors",
      type: 9,
    },
    {
      source: "vite",
      target: "picomatch",
      type: 9,
    },
    {
      source: "vite",
      target: "strip-ansi",
      type: 9,
    },
    {
      source: "vite",
      target: "tslib",
      type: 9,
    },
  ]
  
  return (
    <>
      <LinePlot data={data}  />
    
    </>
  )
}

export default App
