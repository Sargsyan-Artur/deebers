import { tagName, featurePath, excludedFeaturePath, maxInstances, tmpFeaturePath } from '../src/data/testdata';
import * as fileutils from '../src/utils/fileutils';
import * as logHelper from '../src/utils/logHelper';
import * as parallelExecutionUtil from '../src/utils/parallelExecutionUtil';
import dotenv from 'dotenv';
import RerunService from 'wdio-rerun-service';
import {logger} from "../src/utils/logger";

dotenv.config();
let count = 0;

// running in parallel
parallelExecutionUtil.runFeaturesInParallel();

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  before: function (capabilities, specs, tagExpression) {
    // ======================
    // Miscellaneous Packages
    // ======================
    global.timeout = 5000;
    // ===============
    // Custom Commands
    // ===============
  },

  after: async function () {
    count++;
    logger.info(`THE CURRENT BROWSER SESSION ID IS  ${count} >>>> ${browser.sessionId}`);
    await browser.reloadSession();
    await browser.pause(100);
  },

  // NOTE: CUCUMBER-HTML REPORTER DEPENDENCY doesn't support in Azure DevOps
  // and so using JUNIT REPORTER Dependency
  // onPrepare: () => {
  //     removeSync('.tmp/');
  // },

  // onComplete: () => {
  //     generate({
  //         jsonDir: '.tmp/json/',
  //         reportPath: '.tmp/cucumber-report/',
  //     });
  // },

  // reporters: [
  //     'cucumberjs-json',
  //     ['cucumberjs-json', {
  //         jsonFolder: '.tmp/new/',
  //         language: 'en',
  //     },
  //     ],
  // ],

  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: [
    featurePath
  ],
  exclude: [
    excludedFeaturePath
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances,

  capabilities: [],
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'silent',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 60000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  // reporters: ['spec'],

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    // require: ['./test/steps/**/*.ts'],
    require: ['./test/steps/**/*.ts'],
    // <boolean> show full backtrace for errors
    backtrace: true,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: ['pretty'],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <string[]> (name) specify the profile to use
    profile: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    //  tagExpression: '@debeers or @checkout or @engraving or @guestcheckout',
    tagExpression: process.env.TAG_EXPRESSION !== undefined ? process.env.TAG_EXPRESSION : tagName,
    services: [
      [RerunService, {
        ignoredTags: ['@ignore']
      }]
    ],
    // <number> timeout for step definitions
    timeout: 100000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    //
    retry: 0
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
  onPrepare: function (config, capabilities) {
    // print files
    fileutils.printFilesFromDir(tmpFeaturePath);
    // deleting files in a temporary directory
    fileutils.deleteFilesInDirectory('test/tmp/screenshots');
    // deleting files in a reports directory
    fileutils.deleteFilesInDirectory('reports/');
    // deleting files in a Allure directory
    fileutils.deleteFilesInDirectory('allure-results/');
    // creating tmp directory
    fileutils.createDir('test/tmp/screenshots');
  },
  /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
  onWorkerStart: function (cid, caps, specs, args, execArgv) {
    const underscore: string = '_';
    logger.info(`ARGS LENGTH:: ${JSON.stringify(args[underscore].length)}-End`);
    if (JSON.stringify(args[underscore].length > 1)) {
      process.env.TAG_EXPRESSION = JSON.stringify(args[underscore][1]).replace(/['"]+/g, '');
    } else if (process.env.TAG_EXPRESSION !== undefined && process.env.TAG_EXPRESSION !== '') {
      logger.info(`The Tag has been set from environment variable to:  ${process.env.TAG_EXPRESSION}`);
    } else {
      logger.info('No Tag has been set running regresssion');
    }
  },
  /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
  beforeSession: function (config, capabilities, specs, cid) {
    global.isSauceMobile = 'appium:deviceName' in capabilities;
  },
  /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
  // before: function (capabilities, specs) {
  // },
  /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
  // beforeCommand: function (commandName, args) {
  // },
  /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
  // beforeFeature:  function (uri, feature) {
  // },
  /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world world object containing information on pickle and test step
     */
  beforeScenario: function (world) {
    logHelper.printFeatureAndScenarioName(world); // printing scenario details
  },
  /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     */
  // beforeStep: function (step, scenario) {
  // },
  /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {Object}             result   results object containing scenario results
     * @param {boolean}            result.passed   true if scenario has passed
     * @param {string}             result.error    error stack if scenario failed
     * @param {number}             result.duration duration of scenario in milliseconds
     afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    },
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world  world object containing information on pickle and test step
     * @param {Object}                 result results object containing scenario results
     * @param {boolean}                result.passed   true if scenario has passed
     * @param {string}                 result.error    error stack if scenario failed
     * @param {number}                 result.duration duration of scenario in milliseconds
     */
  afterScenario: function (world, result) {
    logHelper.printScenarioResult(world, result); // printing scenario result
  },
  /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
  // afterFeature: function (uri, feature) {
  // },
  afterStep: async function (step, scenario, result) {
    await fileutils.saveScreenshotOnFailures(step, scenario, result);
    logHelper.printStepResult(step, result);
  }

  /**
     *
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
  // after: function (result, capabilities, specs) {
  // },chrome
  /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
  // onReload: function(oldSessionId, newSessionId) {
  // }
};
