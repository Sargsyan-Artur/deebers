import { config as sharedConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    capabilities: [
      {
        browserName: 'chrome',
        mobileEmulationEnabled: false,
        'goog:chromeOptions': {
          args: [
            // '--headless',
            '--window-size=1920,1440',
            '--disable-gpu',
            '--enable-automation',
            '--disable-infobars',
            '--disable-notifications',
            '--start-fullscreen'
          ]

        },
        acceptInsecureCerts: true
      }
    ],
    // JUNIT REPORTER(.xml) DEPENDENCY
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
        suiteNameFormat: /[^a-zA-Z0-9@]+/,
        errorOptions: {
          error: 'message',
          failure: 'message',
          stacktrace: 'stack'
        },
        outputFileFormat: function (options) { // optional
          return `results-${options.cid}.${options.capabilities}.xml`;
        }
      }]
    ]
  }
};
