const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const copy = require('rollup-plugin-copy');

export default [
  {
    input: 'src/index.js',
    plugins: [babel(), copy({ 'src/styles.css': 'dist/styles.css' })],
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/register.js',
    plugins: [babel()],
    output: {
      file: 'dist/register.js',
      format: 'cjs',
    },
  },
];
