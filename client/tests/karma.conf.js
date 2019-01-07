// Karma configuration
// Generated on Mon Jan 07 2019 11:40:47 GMT+0530 (India Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../node_modules/jquery/dist/jquery.min.js',
      '../node_modules/angular/angular.min.js',
      '../node_modules/angular-ui-router/release/angular-ui-router.min.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/popper.js/dist/umd/popper.min.js',
      '../node_modules/bootstrap/dist/js/bootstrap.min.js',
      '../node_modules/sweetalert/dist/sweetalert.min.js',
      '../app/scripts/app.js',
      '../app/scripts/app.constants.js',
      '../app/scripts/app.config.js',
      '../app/scripts/services/dataService.js',
      '../app/scripts/services/loginService.js',
      '../app/scripts/services/employeeService.js',
      '../app/scripts/services/userService.js',
      '../app/scripts/services/eventsService.js',
      '../app/scripts/controllers/loginCtrl.js',
      '../app/scripts/controllers/eventListCtrl.js',
      '../app/scripts/controllers/addEventsCtrl.js',
      '../app/scripts/controllers/employeeCtrl.js',
      './services/loginService.spec.js',
      './services/userService.spec.js',
      './services/eventsService.spec.js',
      './controllers/loginCtrl.spec.js',
      './controllers/eventListCtrl.spec.js',
      './controllers/addEventsCtrl.spec.js',
      './controllers/employeeCtrl.spec.js'

    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
