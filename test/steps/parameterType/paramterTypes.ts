import { defineParameterType } from "@cucumber/cucumber";
import { TElementCollections, TPageName } from "../../../src/types";
import { getPage } from "../../../src/pageObject/pageProvider";
import { loginData } from "../../../src/data/logindata";
import { siteData } from "../../../src/data/testdata";

// (?: ([a-zA-Z]+))?/,

defineParameterType({
  name: "locator",
  regexp:
    /(.+?) (button|input|overlay|checkbox|dropDown)(?: with index (\d*))? on ([a-zA-Z]+) page/,

  transformer: (
    elementName,
    elementCollection: TElementCollections,
    index: string,
    pageName: TPageName
  ) => {
    let element;

    const page = getPage(pageName);
    element = page.getElement(elementName, elementCollection);

    if (index) {
      if (!(element instanceof Function)) {
        // logger.error(`please make sure element "${await element.selector}" is a function and waits "index" argument in page ${page.constructor.name}`)
        throw new Error(`No such element by index ${index}`);
      }
      element = element(index);
    }
    // console.log("elem======withAwait", element)
    // console.log("elem======with",await element)
    //
    // logger.info(`Element: ${await element.selector}, Page: ${page.constructor.name}`)

    return element;
  },
  useForSnippets: false,
});

defineParameterType({
  name: "textCondition",
  regexp: /be|contain|matches/,

  transformer: async (condition) => {
    return condition;
  },
  useForSnippets: false,
});

defineParameterType({
  name: "actionCondition",
  regexp: /displaying|existing|clickable|scrolling/,

  transformer: async (condition) => {
    return condition;
  },
  useForSnippets: false,
});

defineParameterType({
  name: "loginDataByMarket",
  regexp: /uk|us|hk|fr|tw/,

  transformer: async (market) => {
    return loginData[market];
  },
  useForSnippets: false,
});

defineParameterType({
  name: "siteDataByMarket",
  regexp: /uk|us|hk|fr|tw/,

  transformer: async (market) => {
    return siteData[market];
  },
  useForSnippets: false,
});

// defineParameterType({
//     name: 'byIndex',
//     regexp: /by index (\d*)/,
//
//     transformer: async (index) => {
//         // const page = getPage(pageName)
//         console.log("index=====", index)
//         console.log("type=====", typeof index)
//
//         console.log("element=====", await element.selector)
//
//         // return page.getElement(elementName, elementCollection)
//     },
//     useForSnippets: false,
// });
