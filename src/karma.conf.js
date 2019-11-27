module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    angularCli: {
      environment: 'dev'
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/angular7'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha', 'junit', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    junitReporter: {
      useBrowserName: false,
      outputFile: 'unit.xml',
      suite: 'unit'
    }
  });
};
