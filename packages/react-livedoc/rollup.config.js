import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const parseName = (name) => {
  return name.split(/[@/-]/).filter(Boolean).map(capitalize).join("")
}
const name = parseName(pkg.name)

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      name,
      file: pkg.browser,
      format: "umd",
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
      }
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.json']
    }),
    commonjs({
      exclude: 'src/**'
    }),
    babel({
      rootMode: 'upward',
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
  ],
};
