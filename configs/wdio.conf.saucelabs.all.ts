import { config as sharedConfig } from './wdio.shared.conf';
import { getSauceLabsUsername, getSauceLabsAccessKey, getSauceLabsTunnelName, maxInstances } from '../src/data/testdata';
import {logger} from "../src/utils/logger";
const build = `Sauce Labs Headless Desktop build-${new Date().getTime()}`;

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    // SAUCELABS SERVICES
    user: getSauceLabsUsername(),
    key: getSauceLabsAccessKey(),
    region: 'eu', // or 'eu' or 'apac'
    services: [
      ['sauce', {
        sauceConnect: false,
        sauceConnectOpts: {
          // ...
        }
      }]
    ],

    capabilities: [
      /** BROWSERS => WINDOWS - CHROME *****/
      // {
      //     maxInstances: 1,
      //     browserName: 'chrome',
      //     platformName: 'Windows 10',
      //     browserVersion: 'latest-1',
      //     'sauce:options': {
      //         "maxDuration": 10800,
      //         screenResolution: '1920x1080',
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
      // },
      /** *** WINDOWS - MICROSOFTEDGE *****/
      // {
      //     maxInstances: 1,
      //     browserName: 'MicrosoftEdge',
      //     platformName: 'Windows 11',
      //     browserVersion: 'latest',
      //     'sauce:options': {
      //         "maxDuration": 10800,
      //         screenResolution: '1920x1080',
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
      // },
      // /***** MAC - CHROME *****/
      {
        maxInstances,
        browserName: 'Chrome',
        browserVersion: 'latest',
        platformName: 'macOS 12',
        'sauce:options': {
          maxDuration: 10800,
          screenResolution: '1920x1440',
          tunnelIdentifier: getSauceLabsTunnelName(),
          build
        }
      }
      /** *** MAC - SAFARI *****/
      // {
      //     browserName: 'Safari',
      //     browserVersion: 'latest',
      //     platformName: 'macOS 12',
      //     'sauce:options': {
      //     "maxDuration": 10800,
      //         screenResolution: '1920x1440',
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
      // },
      /** *** WINDOWS - FIREFOX *****/
      // {
      //     browserName: 'Firefox',
      //     browserVersion: 'latest',
      //     platformName: 'Windows 10',
      //     'sauce:options': {
      // "maxDuration": 10800,
      //         screenResolution: '1920x1200',
      //          tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
      // },
      // **************************** MOBILES ****************************
      // {
      //     platformName: 'iOS',
      //     browserName: 'Safari',
      //     'appium:deviceName': 'iPhone 13 Simulator',
      //     'appium:platformVersion': '15.0',
      //     'sauce:options': {
      // "maxDuration": 10800,
      //          tunnelIdentifier: getSauceLabsTunnelName(),
      //         build
      //     }
      // },

      // {
      //     platformName: 'Android',
      //     browserName: 'Chrome',
      //     browserVersion: 'latest',
      //     'appium:deviceName': 'Samsung Galaxy S20 WQHD GoogleAPI Emulator',
      //     'appium:platformVersion': '11.0',
      //     'sauce:options': {
      // tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     }
      // },
      // *************************** TABLETS ********************************
      // {
      //     platformName: 'iOS',
      //     browserName: 'Safari',
      //     browserVersion: 'latest',
      //     'appium:deviceName': 'iPad Simulator',
      //     'appium:platformVersion': '14.0',
      //     'sauce:options': {
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     }
      // },

      // 'appium:deviceName': 'iPad Pro 12.9 2021',
      // 'appium:platformVersion': '15.4.1',
      /** IPAD PRO - REAL DEVICES */
      // {
      //     platformName: 'iOS',
      //     browserName: 'Safari',
      //     // browserVersion: 'latest',
      //     'appium:orientation': 'landscape',
      //     'appium:deviceName': 'iPad.*',
      // }

      // {
      //     deviceName: 'iPad_10_2_2021_15_real',
      //     platformVersion: '15.4.1',
      //     platformName: 'iOS',
      //     // automationName: 'UiAutomation',
      //     automationName: 'Appium',
      //     orientation: 'PORTRAIT',
      // }
      /** *** ANDROID - TABLET - VIRTUAL DEVICE *****/
      // {
      //     maxInstances: 2,
      //     platformName: 'Android',
      //     browserName: 'Chrome',
      //     browserVersion: 'latest',
      //     'appium:deviceName': 'Samsung Galaxy Tab S7 Plus GoogleAPI Emulator',
      //     'appium:platformVersion': '11.0',
      //     'sauce:options': {
      //         "maxDuration": 10800,
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     }
      // },
    ],

    // JUNIT REPORTER DEPENDENCY
    reporters: [
      'spec',
      ['allure', {
        outputDir: './allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true
      }],
      ['junit', {
        outputDir: './reports/',
        errorOptions: {
          error: 'message',
          failure: 'message',
          stacktrace: 'stack'
        },
        outputFileFormat: function (options) {
          const formatOptions = JSON.stringify(options.capabilities).replace('sauce:options', 'sauce');
          const filenameParse = JSON.parse(formatOptions);
          const filename = `results-${options.cid}.${JSON.stringify(filenameParse.platformName)}.${JSON.stringify(filenameParse.browserName)}.${JSON.stringify(filenameParse.sauce.build)}.xml`.replace(/["']/g, '');
          logger.info(filename);
          return filename;
        }
      }]
    ]
  }
};
