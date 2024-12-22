// const baseurl = 'https://development.debeers.' // currently not working in Saucelabs. Don't use it. (Uncoment this line and comment the below line to run tests on SauceLabs)
import { uatBaseUrl, sandboxBaseUrl, demoBaseUrlBsu } from "./envs";
import dotenv from "dotenv";
import { TSiteData } from "../types";
import { logger } from "../utils/logger";
dotenv.config();

const environmentType = process.env.ENVIRONMENT_TYPE;
const tagName = process.env.TAG_EXPRESSION
  ? process.env.TAG_EXPRESSION
  : "@regression";
// const featurePath = process.env.PARALLEL !== 'true' ? `./test/features/${process.env.FEATURE_FOLDER}/*.feature` : `./test/features/${process.env.FEATURE_FOLDER}/tmp/*.feature`;
const featurePath =
  process.env.PARALLEL !== "true"
    ? "./test/features/*.feature"
    : "./test/features/tmp/*.feature";

// const excludedFeaturePath = process.env.PARALLEL === 'false' ? `./test/features/${process.env.FEATURE_FOLDER}/tmp/*.feature` : ' ';
const excludedFeaturePath =
  process.env.PARALLEL === "false" ? "./test/features/tmp/*.feature" : " ";

const maxInstances = +process.env.MAX_INSTANCES! || 5;
// const tmpFeaturePath = `test/features/${process.env.FEATURE_FOLDER}/tmp`;
const tmpFeaturePath = "test/features/tmp";

/** TO RUN TESTS from ADO => By default 'ENVIRONMENT_TYPE' flag is set to 'dev'
 * TO RUN TESTS LOCALLY => Set the environment variable 'ENVIRONMENT_TYPE' to 'local' This can be done in the .env file'
 */

// GETTING ENVIRONMENT URLs from YML file through ADO
let usUrl = process.env.US_URL; // Ex: retrieving from ADO => "https://development.debeers.com:443";
let ukUrl = process.env.UK_URL; // Ex: retrieving from ADO => "https://development.debeers.co.uk:443"
let frUrl = process.env.FR_URL; //  https://development.debeers.fr
let twUrl = process.env.TW_URL; //  https://development.debeers.tw
let hkUrl = process.env.HK_URL; //  https://development.debeers.hk

// DOMAINS
let domainUS;
let domainUK;
let domainFR;
let domainTW;
let domainHK;

export {
  environmentType,
  tagName,
  featurePath,
  excludedFeaturePath,
  maxInstances,
  tmpFeaturePath,
}; // This is being called in checkout.steps.ts

/** GET UPDATED ADO MARKET URL */
const getUpdatedADOUrl = (url: string) => {
  let httpStr, marketStr, updatedUrl;
  if (url.includes("//")) {
    httpStr = url.split("//"); // httpStr[0] => https ; httpStr[1] = development.debeers.com:443
    if (httpStr[1].includes(":")) {
      marketStr = httpStr[1].split(":"); // marketStr[0] => development.debeers.com
    }
    updatedUrl =
      httpStr[0] +
      "//" +
      process.env.ENV_USERNAME +
      ":" +
      process.env.ENV_PASSWORD +
      "@" +
      marketStr[0] +
      "/";
    logger.info(" *** Updated ADO URL :: " + updatedUrl);
  }
  return updatedUrl;
};

/** ENV URL METHOD */
logger.info(`TAG_EXPRESSION :: ${process.env.TAG_EXPRESSION}`);
logger.info(`*** TagName :: ${tagName}`);

if (environmentType === "prod") {
  logger.info('Environment Type in "testdata.ts" file :: ' + environmentType);
  usUrl = process.env.US_URL || "https://debeers.com/en-us/";
  ukUrl = process.env.UK_URL || "https://debeers.co.uk/en-gb/";
  frUrl = process.env.FR_URL || "https://debeers.fr/fr-fr/";
  hkUrl = process.env.HK_URL || "https://www.debeers.hk/zh-hk/";
  twUrl = process.env.TW_URL || "https://www.debeers.tw/zh-tw/";
} else if (environmentType === "dev") {
  logger.info("Environment Type :: " + environmentType);
  usUrl = getUpdatedADOUrl(usUrl!);
  ukUrl = getUpdatedADOUrl(ukUrl!);
  frUrl = getUpdatedADOUrl(frUrl!);
  hkUrl = getUpdatedADOUrl(hkUrl!);
  twUrl = getUpdatedADOUrl(twUrl!);

  // DOMAINS
  domainUS = "development.debeers.com";
  domainUK = "development.debeers.co.uk";
  domainFR = "development.debeers.fr";
  domainTW = "development.debeers.tw";
  domainHK = "development.debeers.hk";
} else if (environmentType === "local") {
  logger.info("Environment Type :: " + environmentType);
  usUrl = uatBaseUrl + "com/";
  ukUrl = uatBaseUrl + "co.uk/";
  frUrl = uatBaseUrl + "fr/";
  hkUrl = uatBaseUrl + "hk/";
  twUrl = uatBaseUrl + "tw/";
  logger.info("US URL :: " + usUrl);

  // DOMAINS
  domainUS = "development.debeers.com";
  domainUK = "development.debeers.co.uk";
  domainFR = "development.debeers.fr";
  domainTW = "development.debeers.tw";
  domainHK = "development.debeers.hk";
} else if (environmentType === "sandbox") {
  logger.info("Environment Type :: " + environmentType);
  usUrl = sandboxBaseUrl + "/s/DeBeersInternationalNet/" + "en-us/";
  ukUrl = sandboxBaseUrl + "/s/DeBeersInternationalGross/" + "en-gb/";
  frUrl = sandboxBaseUrl + "/s/DeBeersInternationalGross/" + "fr-fr/";
  hkUrl = sandboxBaseUrl + "/s/DeBeersInternationalGross/" + "zh-hk/";
  twUrl = sandboxBaseUrl + "/s/DeBeersInternationalGross/" + "zh-tw/";
  logger.info("US URL :: " + usUrl);

  const domain = "bdbt-007.dx.commercecloud.salesforce.com";

  // DOMAINS
  domainUS = domain;
  domainUK = domain;
  domainFR = domain;
  domainTW = domain;
  domainHK = domain;
} else if (environmentType === "demo") {
  logger.info("Environment Type :: " + environmentType);
  usUrl = demoBaseUrlBsu + "/s/DeBeersInternationalNet/" + "en-us/";
  ukUrl = demoBaseUrlBsu + "/s/DeBeersInternationalGross/" + "en-gb/";
  frUrl = demoBaseUrlBsu + "/s/DeBeersInternationalGross/" + "fr-fr/";
  hkUrl = demoBaseUrlBsu + "/s/DeBeersInternationalGross/" + "zh-hk/";
  twUrl = demoBaseUrlBsu + "/s/DeBeersInternationalGross/" + "zh-tw/";
  logger.info("US URL :: " + usUrl);

  const domain = "bdbt-004.dx.commercecloud.salesforce.com";

  // DOMAINS
  domainUS = domain;
  domainUK = domain;
  domainFR = domain;
  domainTW = domain;
  domainHK = domain;
}

/** *** SAUCELABS CREDENTIALS METHODS *****/

export const getSauceLabsUsername = () => {
  return process.env.SAUCE_USERNAME;
};

export const getSauceLabsAccessKey = () => {
  return process.env.SAUCE_ACCESS_KEY;
};

// To run via locally on SauceLabs change the 'environmentType' to local.
export const getSauceLabsTunnelName = () => {
  const sauceLabsTunnelName = process.env.SAUCE_TUNNELNAME;
  logger.info(`SauceLabs Tunnel Name ::  ${sauceLabsTunnelName}`);
  logger.info(`SauceLabs Username ::  ${process.env.SAUCE_USERNAME}`);
  logger.info(`SauceLabs Access Key ::  ${process.env.SAUCE_ACCESS_KEY}`);
  logger.info(`SauceLabs DCC ::  ${process.env.SAUCE_DC}`);
  return sauceLabsTunnelName;
};

export const siteData: TSiteData = {
  us: {
    url: usUrl!,
    rings: "jewellery/rings/",
    pdpAffirmSKU: "R102346.html",
    home: "home",
    pdpSKU: "R103694.html",
    uppSKU: "R102282.html",
    uppSKU1: "R102189.html",
    uppClassicSKU: "E102142.html",
    uppClassicRoundPendantSKU: "N102186.html",
    cardDetails: "4111 1111 4555 1142",
    expiryDate: "03/30",
    cvccvv: "737",
    domain: domainUS,
    bookAppointment: "book-an-appointment",
    clientServices: "client-services",
    location: "Geneva",
  },
  uk: {
    url: ukUrl!,
    rings: "jewellery/rings/",
    pdpKlarnaSKU: "R102244.html",
    pdpSKU: "R103694.html",
    uppSKU: "R102282.html",
    uppSKU1: "R102258.html",
    uppClassicSKU: "E102142.html",
    uppClassicRoundPendantSKU: "N102186.html",
    home: "home",
    cardDetails: "4111 1111 4555 1142",
    expiryDate: "03/30",
    cvccvv: "737",
    domain: domainUK,
    bookAppointment: "book-an-appointment",
    clientServices: "client-services",
    location: "London",
  },
  fr: {
    url: frUrl!,
    rings: "joaillerie/bagues/",
    home: "home",
    pdpSKU: "R103694.html",
    uppSKU: "R102282.html",
    uppSKU1: "R102262.html",
    uppClassicSKU: "E102142.html",
    uppClassicRoundPendantSKU: "N102186.html",
    cardDetails: "4111 1111 4555 1142",
    expiryDate: "03/30",
    cvccvv: "737",
    domain: domainFR,
    bookAppointment: "book-an-appointment",
    clientServices: "client-services",
    location: "Paris",
  },
  tw: {
    url: twUrl!,
    rings: "jewellery/rings/",
    home: "home",
    pdpSKU: "R103694.html",
    uppSKU: "R102282.html",
    uppSKU1: "R102254.html",
    uppClassicSKU: "E102142.html",
    uppClassicRoundPendantSKU: "N102186.html",
    cardDetails: "4111 1111 4555 1142",
    expiryDate: "03/30",
    cvccvv: "737",
    domain: domainTW,
    bookAppointment: "book-an-appointment",
    clientServices: "client-services",
    location: "Hong Kong",
  },
  hk: {
    url: hkUrl!,
    rings: "jewellery/rings/",
    home: "home",
    pdpSKU: "R103694.html",
    uppSKU: "R102282.html",
    uppSKU1: "R102258.html",
    uppClassicSKU: "E102142.html",
    uppClassicRoundPendantSKU: "N102186.html",
    cardDetails: "4111 1111 4555 1142",
    expiryDate: "03/30",
    cvccvv: "737",
    domain: domainHK,
    bookAppointment: "book-an-appointment",
    clientServices: "client-services",
    location: "Hong Kong",
  },
};
