import chalk from 'chalk';

export const getPlatformName = () => {
  if (
    'platformName' in browser.capabilities &&
    'browserName' in browser.capabilities
  ) {
    // @ts-expect-error
    return `**** Platform: ${browser.capabilities.platformName.toUpperCase()}(${browser.capabilities.browserName.toUpperCase()})`;
  }
};

export const printFeatureAndScenarioName = (world: any) => {
  console.log('--------------------------------------------------');
  console.log(
    chalk.blue(
      `********* FEATURE ********* ${
        world.gherkinDocument.feature.name
      } ${getPlatformName()} *********`
    )
  );
  console.log(
    chalk.yellow(
      `**** SCENARIO **** ${world.pickle.name} ${getPlatformName()} ****`
    )
  );
};

export const printScenarioResult = (world: any, result: any) => {
  if (result.passed) {
    console.log(
      chalk.green(
        `**** TEST RESULT **** PASSED **** ${
          world.pickle.name
        } ${getPlatformName()} ****`
      )
    );
  } else {
    console.log(
      chalk.red(
        `**** TEST RESULT **** FAILED **** ${
          world.pickle.name
        } ${getPlatformName()} ****`
      )
    );
  }
};

export const printStepResult = (step: any, result: any) => {
  if (result.passed) {
    console.log(
      chalk.green(
        `*** STEP NAME *** ${step.text} ${getPlatformName()} *** PASSED ***`
      )
    );
  } else {
    console.log(
      chalk.red(
        `*** STEP NAME *** ${step.text} ${getPlatformName()} *** FAILED ***`
      )
    );
  }
};
