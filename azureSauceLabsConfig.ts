import {logger} from "./src/utils/logger";

const { execSync } = require('child_process');
require('dotenv').config();
let sauceLabsRunCommand = '';

const sauceLabsConfiguration = async () => {
  const sauceLabsDevicesBrowsersStackValueFromADO = process.env.SAUCE_DEVICES_BROWSERS_STACK as string;

  logger.info(' SauceLabs Group Variable fom ADO :: ', sauceLabsDevicesBrowsersStackValueFromADO);

  if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'all' || sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'regression') {
    process.env.FEATURE_FOLDER = 'desktop';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on ALL - Browers/Mobiles/Tablets ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.all.ts --parallel=true';
  } else if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'winchrome') {
    process.env.FEATURE_FOLDER = 'desktop';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on WINDOWS Chrome only ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.winchrome.ts --parallel=true';
  } else if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'macsafari') {
    process.env.FEATURE_FOLDER = 'desktop';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on MAC Safari only ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.macsafari.ts --parallel=true';
  } else if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'mobiles') {
    process.env.FEATURE_FOLDER = 'mobile';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on MOBILES only ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.mobiles.ts --parallel=true';
  } else if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'tablets') {
    process.env.FEATURE_FOLDER = 'tablet';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on TABLETS only ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.tablets.ts --parallel=true';
  } else if (sauceLabsDevicesBrowsersStackValueFromADO.toLowerCase() === 'desktops') {
    process.env.FEATURE_FOLDER = 'desktop';
    logger.info(' ***** Feature folder ***** ' + process.env.FEATURE_FOLDER);
    logger.info(' ***** Saucelabs regression config on DESKTOP BROWSERS only ***** ');
    sauceLabsRunCommand = 'npx wdio run ./wdio.conf.saucelabs.desktops.ts --parallel=true';
  }

  /** Runs the script command */
  execSync(sauceLabsRunCommand, {
    stdio: 'inherit'
  });
};
sauceLabsConfiguration();
