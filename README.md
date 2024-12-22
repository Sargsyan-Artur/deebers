# DEBEERS REGRESSION AUTOMATION FRAMEWORK
## TechStack:
- Node.js
- NPM
- WebdriverIO
- Typescript
- Cucumber.js
- VisualStudio Code IDE
- SauceLabs -> CrossBrowser/Mobile Devices Testing
- ADO -> CI/CD Pipeline

# Clonning the project
REPO: https://AngloDevOps@dev.azure.com/AngloDevOps/dbj-salesforce/_git/sfcc_b2c_automation
### To install all Project dependencies, run the below command:
 `npm i` 
  NOTE: If for any reason you get failure running the `npm i`, then ensure that you have a lower verion of node ex. "v14.18.1"
# Install & Run tests on SafariDriver:
    To run tests locally on Mac - Safari, makesure that SafariDriver is installed in your system. If not follow the below steps or use the link below: "https://www.npmjs.com/package/wdio-safaridriver-service"

- Open cmd prompt, run the following: `safaridriver --enable`
- Choose Safari -> Preferences, and on the Advanced tab, select "Show Develop menu in menu bar"
- Choose `Develop -> Allow Remote Automation`
- Authorize safaridriver to launch the XPC service that hosts the local web server. To permit this, manually run `/usr/bin/safaridriver` once and follow the authentication prompt.

# SETTING YOUR VARIABLES IN .env

To run any of the above tests, you will need to populate an .env file with the relevant values, note you will need to add Saucelab credentials to utilise this script. There is a sample env.example included in this repo.

Please do not push the .env file to the repository (it's being dismissed by the .gitignore file, but do take extra care when pushing changes).

```
SAUCE_TUNNELNAME=
SAUCE_USERNAME=
SAUCE_ACCESS_KEY=
SAUCE_DC=
SAUCE_DEVICES_BROWSERS_STACK=
ENV_USERNAME=
ENV_PASSWORD=
UK_URL=
US_URL=
FR_URL=
TW_URL=
HK_URL=
ENVIRONMENT_TYPE=
TAG_EXPRESSION=
LOCAL=
PARALLEL=
MAX_INSTANCES=
FEATURE_FOLDER=

```

# TO RUN TESTS LOCALLY on DESKTOP:

- For running locally, within the `.env` file that you create, you should set `LOCAL=true` 
- To access the development site, specify the username and password for the following variables `ENV_USERNAME` `ENV_PASSWORD` 


Repeating in this secion again - Please do not push the .env file to the repository (it's being dismissed by the .gitignore file, but do take extra care when pushing changes).

# RUNNING TEST WITH TAGS:
- Each wido config file has a `onWorkerStart` function that retrieves the tag which can either be set from:
1. The environment variable `TAG_EXPRESSION` either within `.env` file/saved in your local branch, computer environment variables, or set within an instance of a terminal windows `i.e export TAG_EXPRESSION=login`  or in AzureDevops 
2. Then simply execute any of the scripts in command line and specify the tag denoted with an @ symbol. For example `test-local-desktop "@login"`
- Note: If no tags is set then all tests tagged with `regression`  will be executed

- To change the default tag that gets executed you can updated `testdata.ts` and update the expected conditions for the `tagName` from regression to something else. For example
From:
`let tagName  = process.env.TAG_EXPRESSION != undefined ? process.env.TAG_EXPRESSION : "@regression";`
To:
`let tagName  = process.env.TAG_EXPRESSION != undefined ? process.env.TAG_EXPRESSION : "@sanity";`

Note: To execute the `azureSuceLabsConfig.ts` script, the specific tag needs to be set as a `TAG_EXPRESSION`. See point 1 above.

# Running the tests on SauceLabs through locally, local-mobile, and local-desktop
Below are the commands we use in running our test which are defined in the package.json file
    "scripts": {
        `"test-local-desktop": "npx wdio run ./wdio.conf.desktop.ts", -- To run locally`
        `"test-local-mobile": "npx wdio run ./wdio.conf.mobile.ts", --local-mobile`
        `"test-saucelabs-desktops": "npx wdio run ./wdio.conf.saucelabs.desktops.ts", --To run only on  desktops via SauceLabs`
    },

# RUNNING on ALL MARKETS AS PART OF a TEST SUITE (WIP)
## Running tests on SAUCELABS:
    Request for SauceLabs account and have your "SAUCE_USERNAME" and "SAUCE_ACCESS_KEY"

# DOWNLOAD SAUCELABS TUNNEL CONNECT:
    Download the Sauce Connect from the below link:
    https://docs.saucelabs.com/secure-connections/sauce-connect/installation/
## Starting a Tunnel from the COMMAND Prompt locally into your system
- #### NOTE:
{Your SauceLabs Username} => Ex: Pavani9 
{Your SauceLabs AccessKey} => Ex: 271a0130-ef8e-4c1c-9376-a9aca9d87bec
{Your Saucelabs Username}_tunnel_name => Ex: Pavani9_tunnel_name 

- Open CMD Prompt
- Navigate to the `bin` folder where you have downloaded your sauce connect, then edit tunnel name. For ex:  

- ./sc -u Pavani9 -k 271a0130-ef8e-4c1c-9376-a9aca9d87bec --region eu-central --tunnel-name Pavani9_tunnel_name --auth development.debeers.co.uk:443:password:password --auth development.debeers.tw:443:password:password --auth development.debeers.hk:443:password:password  --auth development.debeers.fr:443:password:password --auth development.debeers.tw:443:password:password --auth development.debeers.com:443:password:password

- NOTE: For reference, see CLI reference here: https://app.eu-central-1.saucelabs.com/tunnels and https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/#--auth, https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/basic-setup/

# TRIGGERING THE BUILD from ADO based on the 'sauceDevicesBrowsersStack' VARIABLE GROUP VALUE:
- In ADO, `Pipelines` -> `Library` -> `dbj-sfcc_b2c_automation` -> Variable: `devicesBrowsersStack` 
By default it's value is set to `all` to run nightly regression on all Browsers/Mobiles/Tables into the SauceLabs
    -- The `devicesBrowsersStack` variable values listed below:
    Entering the value,
        - regression or all or prod -> Runs regression on all browers/mobiles/tablets
        - winchrome -> Runs all regression tagged scenarios on Windows/Chrome browser
        - macsafari -> Runs all regression tagged scenarios on MAC/Safari browser
        - mobiles -> Runs all regression tagged scenarios on IOS Simulator/Android Emulator
        - tablets -> Runs all regression tagged scenarios on IOS/Android Tablets
        - desktops -> Runs all regression tagged scenarios on WINDOWS/MAC OS with Chrome/Edge/Firefox/Safari browers respectively
### HOW ADO's `devicesBrowsersStack` VARIABL VALUE WORKS?

- From `azure-pipelines.yml` file, calls the above varibale like this:
 `SAUCE_DEVICES_BROWSERS_STACK: $(devicesBrowsersStack)`
- When `npm install test-saucelabs` is triggered from yml file, which looks for that command into package.json then it invokes the `node azureSauceLabsConfig.ts` file
    NOTE: In package.json, test-saucelabs command consists of ` "test-saucelabs": "node azureSauceLabsConfig.ts" `
- The `SAUCE_DEVICES_BROWSERS_STACK` value fetched from ADO is used as input into the `azureSauceLabsConfig.ts` file to fetch the corresponding sauceLabs config file to runs regression tests into SauceLabs

## NOTE: Similarly, we added Environment URL in ADO and using it into the following:
`src -> data -> testdata.ts` file 

## Linter 

We use ESLint for static analyzing the source code.
ESLint statically analyzes code to quickly find problems.
- To analyze the file and auto-fix it, just specify the path to the file and run the following command:

`npx eslint pathToFile --fix`

## Parallel execution

To run automated tests in parallel you need to specify the following ENV variables and set up corresponding values:

`PARALLEL=true`
`MAX_INSTANCES=5`
`FEATURE_FOLDER=desktop`


Where `PARALLEL` - means that it is expected that tests to be run in parallel.
Where `MAX_INSTANCES` - means how many browser instances will be launched simultaneously and how many feature files will be executed concurrently. There is good documentation of this option here `https://webdriver.io/docs/organizingsuites/`
Where `FEATURE_FOLDER` - name of feature folder. For instance, `desktop` or `mobile`.

NOTE: Nowadays, 7 virtual machines are allocated for us in SauceLabs, so we cannot run more than 7 threads. Recommendation to run it in 5 threads.

To run it locally (PARALLEL), execute the below command:

`npm run test-local-desktop-parallel`

To run it locally via SauceLabs (PARALLEL), execute the below command:

`npm run test-saucelabs-all-parallel`

## Allure Report

To generate and open Allure report, execute the below command:

`npm run allure-report`

## Running Lighthouse tests from local machine

Project to run performance tests using Lighthouse for De Beers website.

Used links:
- home page: 
- plp page: 
- pdp page: 
- upp page:
- book appointments page:

NOTE: to run Lighthouse tests you need to add env variable into .env file

To run all markets you should specify: 

`LIGHTHOUSE_MARKET=all`

To run single market you should specify it: 

`LIGHTHOUSE_MARKET=UK`

Make sure the latest version of Chrome browser is installed on your machine. To start tests - run in terminal:

`npm run performance`

To run any particular test (WIP)
run in terminal:

`node performance/pathToPageFile`

Example:

`node performance/US/desktop/home.js`

WHERE:

`US = market`

`desktop = platform`

`home.js = target page`

Results are stored in the performance/reports_ folder in .json and .html formats

