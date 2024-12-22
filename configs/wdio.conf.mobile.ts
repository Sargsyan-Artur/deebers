import { config as sharedConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    capabilities: [
      {
        browserName: 'chrome',
        mobileEmulationEnabled: true,
        device: 'iPhone 10',
        'goog:chromeOptions': {
          mobileEmulation: {
            deviceName: 'iPhone X',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            deviceMetrics: {
              width: 375,
              height: 812,
              pixelRatio: 3,
              touch: true
            }
          },
          args: [
            '--device=iPhone X',
            'os_version=14',
            // '--headless',
            '--disable-gpu',
            '--enable-automation',
            '--disable-infobars',
            '--disable-notifications',
            '--window-size=375,812',
            '--use-mobile-user-agent',
            '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
          ]
        }
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
