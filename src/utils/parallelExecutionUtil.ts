import { tagName } from '../data/testdata';
import dotenv from 'dotenv';
import wdioParallel from 'wdio-cucumber-parallel-execution';
dotenv.config();
// const sourceSpecDirectory = `test/features/${process.env.FEATURE_FOLDER}/`;
const sourceSpecDirectory = 'test/features/';

// If parallel execution is set to true, then create the Split the feature files
// And store then in a tmp spec directory (created inside `the source spec directory)

export const runFeaturesInParallel = () => {
  if (process.env.PARALLEL === 'true') {
    // const tmpSpecDirectory = `test/features/${process.env.FEATURE_FOLDER}/tmp`;
    const tmpSpecDirectory = 'test/features/tmp';
    wdioParallel.performSetup({
      sourceSpecDirectory,
      tmpSpecDirectory,
      cleanTmpSpecDirectory: true,
      tagExpression: process.env.TAG_EXPRESSION
        ? process.env.TAG_EXPRESSION
        : tagName
    });
  }
};
