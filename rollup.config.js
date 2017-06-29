import typescript from 'rollup-plugin-typescript';

export default {
  entry: './src/index.ts',
  dest: './lib/index.umd.js',
  format  : 'umd',
  moduleName: 'angularDirectiveMocker',
  sourceMap: true,
  plugins: [
    typescript({
      typescript: require('typescript'),
    })
  ],
  external: [
    'angular'
  ],
  globals: {
    angular: 'angular'
  }
};
