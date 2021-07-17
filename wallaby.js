module.exports = (w) => {
  return {
    autoDetect: true,
    compilers: {
      '**/*.ts?(x)': w.compilers.typeScript({
        rootDir: './'
      }),
    },
    files: [
      'src/**/*.ts*',
      'stories/**/*.ts*',
      'test/**/*.ts*',
    ],
    testFramework: {
      configFile: './jest.config.wallaby.js'
    },
  }
};