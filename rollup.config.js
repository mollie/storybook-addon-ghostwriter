var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var copy = require('rollup-plugin-copy');

export default [
  {
    input: 'src/index.js',
    plugins: [
      babel(),
      copy({ 'src/mollie-logo.svg': 'dist/mollie-logo.svg', 'src/styles.css': 'dist/styles.css' }),
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
