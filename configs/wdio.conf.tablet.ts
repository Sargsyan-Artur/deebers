import {config as sharedConfig} from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    capabilities: [
        {
            browserName: 'chrome',
            mobileEmulationEnabled: true,
            device: 'Galaxy Tab S4',
            'goog:chromeOptions': {
                mobileEmulation: {
                    deviceName: 'Galaxy Tab S4',
                    userAgent: 'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
                    deviceMetrics: {
                        width: 712,
                        height: 1138,
                        pixelRatio: 3,
                        touch: true
                    }
                },

                args: [
                    '--device=Galaxy Tab S4',
                    'os_version=14',
                    // '--headless',
                    '--disable-gpu',
                    '--enable-automation',
                    '--disable-infobars',
                    '--disable-notifications',
                    '--window-size=712,1138',
                    '--use-mobile-user-agent',
                    '--user-agent=Mozilla/5.0 (Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36'
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
};