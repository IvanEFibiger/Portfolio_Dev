// Karma configuration for Angular unit tests.
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/portfolio-ivan-web'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-gpu-compositing',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-accelerated-2d-canvas',
          '--disable-accelerated-video-decode',
          '--disable-features=CalculateNativeWinOcclusion,VizDisplayCompositor,UseSkiaRenderer',
          '--disable-direct-composition',
          '--disable-3d-apis',
          '--remote-debugging-port=9222',
          `--user-data-dir=${require('path').join(__dirname, '.karma-chrome')}`,
        ],
      },
    },
    restartOnFileChange: true,
  });
};