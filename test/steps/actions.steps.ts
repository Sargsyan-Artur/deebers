import { When } from "@wdio/cucumber-framework";
import { TElement, ILoginData, ISiteData, TLogin } from "../../src/types";
import { Element } from "../../src/support/element";
import { getPage } from "../../src/pageObject/pageProvider";
import {
  PAGES,
  PAUSE_TIMEOUT10,
  PAUSE_TIMEOUT30,
} from "../../src/support/constants/constants";
import { helpers } from "../../src/support/helpers/helpers";
import { logger } from "../../src/utils/logger";

When("User {locator} {byIndex}", async (text: string, element: TElement) => {
  await Element.init(element).actions.setText(text);
});

When("User clicks {locator}", async (element: TElement) => {
  await Element.init(element).wait.forExist(PAUSE_TIMEOUT30);
  await Element.init(element).actions.click();
});

When("User clicks {locator} with wait", async (element: TElement) => {
  await Element.init(element).wait.forExist(PAUSE_TIMEOUT30);
  await Element.init(element).actions.click(PAUSE_TIMEOUT30);
});

When(
  "User clicks {locator} after {actionCondition}",
  async (element: TElement, condition: string) => {
    await Element.init(element).wait.forExist(PAUSE_TIMEOUT30);
    await Element.init(element).actions.clickAfter(condition);
  }
);

When("User double clicks {locator}", async (element: TElement) => {
  await Element.init(element).wait.forExist(PAUSE_TIMEOUT10);
  await Element.init(element).actions.doubleClick();
});

When(
  "User selects {locator} in {loginDataByMarket} by {string}",
  async (element: TElement, loginData: ILoginData, text: string) => {
    const txt = loginData[text];
    await Element.init(element).actions.selectByText(txt);
  }
);

When(/^User goes to login page$/, async () => {
  const page = getPage<TLogin>(PAGES.LOGIN);
  await page.goToMyAccount();
});

When(
  "User fills {string} in {locator}",
  async (text: string, element: TElement) => {
    await Element.init(element).actions.setText(text);
  }
);

When(
  "User navigates to {string} page on {siteDataByMarket} market",
  async (urlName, siteData: ISiteData) => {
    logger.info(`URL ${siteData.url}${siteData[urlName]}`);

    await browser.url(`${siteData.url}${siteData[urlName]}`);
    await helpers.setDwCookie(siteData.domain);
    await helpers.setOneTrustCookie(siteData.domain);
    await helpers.setIgnorePopUpCookie(siteData.domain);

    await browser.refresh();
  }
);

When("User skips overlays", async () => {
  const page: TLogin = getPage(PAGES.LOGIN);
  const cancelNewsletterButton = page.cancelNewsletterButton;
  const cancelCookiePopUpButton = page.cancelCookiePopUpButton;
  const internationalSitesPopUpContinueButton =
    page.internationalSitesPopUpContinueButton;

  await Element.init(cancelNewsletterButton).actions.click();
  await Element.init(cancelCookiePopUpButton).actions.click();
  await Element.init(internationalSitesPopUpContinueButton).actions.click();

  await browser.refresh();
});
