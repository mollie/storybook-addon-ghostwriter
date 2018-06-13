var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var css = require('rollup-plugin-css-only');
var copy = require('rollup-plugin-copy');

export default [
  {
    input: 'src/index.js',
    plugins: [
      css({ output: 'dist/styles.css' }),
      babel(),
      copy({ 'src/mollie-logo.svg': 'dist/mollie-logo.svg' }),
    ],
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
