import { config as sharedConfig } from './wdio.shared.conf';
import { getSauceLabsUsername, getSauceLabsAccessKey, getSauceLabsTunnelName } from '../src/data/testdata';
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
      // ***** WINDOWS - CHROME *****
      // {
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
      // ***** WINDOWS - EDGE *****
      // {
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
      // ***** SauceLabs MAC Available resolutions: '1920x1440', '2048x1536', '1024x768',
      //                                            '1152x864', '1280x960', '1376x1032', '1440x900', '1600x1200' *****
      // ***** MAC - CHROME *****
      {
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
      // ***** MAC - SAFARI *****
      // {
      //     browserName: 'Safari',
      //     browserVersion: 'latest',
      //     platformName: 'macOS 12',
      //     'sauce:options': {
      //         "maxDuration": 10800,
      //         screenResolution: '1920x1440',
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
      // },
      // ***** MAC - FIREFOX *****
      // {
      //     browserName: 'Firefox',
      //     browserVersion: 'latest',
      //     platformName: 'macOS 12',
      //     'sauce:options': {
      //         "maxDuration": 10800,
      //         screenResolution: '1920x1440',
      //         tunnelIdentifier: getSauceLabsTunnelName(),
      //         build,
      //     },
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
