import { When } from "@wdio/cucumber-framework";
import { ILoginData, TCheckout, TElement, TLogin } from "../../src/types";
import { getPage } from "../../src/pageObject/pageProvider";
import {
  PAGES,
  PAUSE_TIMEOUT10,
  PAUSE_TIMEOUT15,
} from "../../src/support/constants/constants";
import { Element } from "../../src/support/element";
import { loginData } from "../../src/data/logindata";
import { DATAS } from "../../src/data";

When(
  "User fills login password as {loginDataByMarket} {string} in checkout page",
  async (loginData: ILoginData, userType: string) => {
    if (userType === "user") {
      const page = getPage<TCheckout>(PAGES.CHECKOUT);
      const loginElem = page.inputs.email;
      const passwordElem = page.inputs.password;

      await Element.init(loginElem).actions.setText(
        loginData.emailAddress,
        PAUSE_TIMEOUT10
      );
      await Element.init(passwordElem).actions.setText(
        loginData.password,
        PAUSE_TIMEOUT10
      );
    } else {
      const page = getPage<TLogin>(PAGES.LOGIN);
      const email = page.inputs.guestEmail;

      await Element.init(email).actions.setText(
        loginData.emailAddress,
        PAUSE_TIMEOUT10
      );
    }
  }
);

When(
  "User fills {string} delivery detail in {locator} in {loginDataByMarket}",
  async (text: string, element: TElement, loginData: ILoginData) => {
    const txt = loginData[text];
    await Element.init(element).actions.setText(txt);
  }
);
// . /^I navigate to the Basket page on (.+)$/
// When(
//   "I fill in the delivery detail form in {string} with valid details",
//   async (market, dataTable) => {
//     let element;
//     let page;
//
//     for (const data of dataTable.hashes()) {
//       page = getPage<TCheckout>(data.Page);
//       element = page.getElement(data.Element, data.ElementType);
//
//       await Element.init(element).actions.scrollInToView();
//       await Element.init(element).wait.forDisplayed();
//       await Element.init(element).actions.setText(
//         loginData[market][data.Detail]
//       );
//     }
//     // await browser.pause(12000);
//
//     // const userDetails = dataTable.hashes()[0];
//     // console.log("dataTable===", dataTable)
//     // console.log("userDetails===", userDetails)
//
//     // const page = getPage<TCheckout>(userDetails.Page);
//     // const element = page.getElement(userDetails.Element, userDetails.ElementType)
//
//     // fill in the registration form with the userDetails object
//   }
// );

When(
  /^User fills (Login Data|Payment Data|Edit Data|Site Data) in (uk|us|tw|fr|hk) market$/,
  async (recourse, market, dataTable) => {
    let element;
    let page;
    const data = DATAS[recourse];

    for (const table of dataTable.hashes()) {
      page = getPage<TCheckout>(table.Page);
      element = page.getElement(table.Element, table.ElementType);

      await Element.init(element).actions.scrollInToView();
      await Element.init(element).wait.forDisplayed();
      await Element.init(element).actions.setText(data[market][table.Detail]);
    }
    // await browser.pause(12000);

    // const userDetails = dataTable.hashes()[0];
    // console.log("dataTable===", dataTable)
    // console.log("userDetails===", userDetails)

    // const page = getPage<TCheckout>(userDetails.Page);
    // const element = page.getElement(userDetails.Element, userDetails.ElementType)

    // fill in the registration form with the userDetails object
  }
);

// async setBillingDetailsChrome (cNumber: string, expiryDate: string, secureCode: string, cardHolderName?: string) {
//     await this.handleDbjSpinner();
//     const cardNumberIFrameElement = await $('.adyen-checkout__card__cardNumber__brandIcon + iframe');
//     const cardExpiryIFrameElement = await $('.adyen-checkout__card__exp-date__input > iframe');
//     const cardCVVIFrameElement = await $('.adyen-checkout__card__cvc__input > iframe');
//     // CLICK ON CC LABEL
//     await click(this.creditCardLabel);
//
//     // FILL OUT CC NUMBER
//     await cardNumberIFrameElement.waitForExist({ timeout: SPINNER_TIMEOUT });
//     await browser.switchToFrame(cardNumberIFrameElement);
//     await this.chromeCardNumberInput.waitForDisplayed({ timeout: PAUSE_TIMEOUT4 });
//     await setText(this.chromeCardNumberInput, cNumber);
//     await browser.pause(100); // need for stability
//     await browser.switchToParentFrame();
//
//     // FILL OUT EXPIRATION DATE
//     await browser.switchToFrame(cardExpiryIFrameElement);
//     await setText(this.chromeExpiryDateInput, expiryDate);
//     await browser.switchToParentFrame();
//
//     // FILL OUT CVV
//     await browser.switchToFrame(cardCVVIFrameElement);
//     await setText(this.chromeSecurityCodeInput, secureCode);
//     await browser.switchToParentFrame();
//
//     // NOTE: temporarily disabled on UAT
//     // FILL OUT CARD HOLDER NAME
//     // await setText(this.cardHolderName, cardHolderName)
// }
When(
  /^User fills Card Details for (Amex|Discover|Visa|MasterCard) in (uk|us|tw|fr|hk) market$/,
  async (market, dataTable) => {
    const page = getPage<TCheckout>(PAGES.CHECKOUT);

    const cardNumber = page.cardNumberInput;
    const expireDate = page.expiryDateInput;
    const cvc = page.securityCodeInput;

    const cardNumberIFrameElement = await $(
      ".adyen-checkout__card__cardNumber__brandIcon + iframe"
    );
    const cardExpiryIFrameElement = await $(
      ".adyen-checkout__card__exp-date__input > iframe"
    );
    const cardCVVIFrameElement = await $(
      ".adyen-checkout__card__cvc__input > iframe"
    );

    //     await click(this.creditCardLabel);

    // FILL OUT CC NUMBER
    await cardNumberIFrameElement.waitForExist({ timeout: PAUSE_TIMEOUT15 });
    await Element.init(cardNumberIFrameElement).actions.switchToFrame();
    await Element.init(cardNumber).wait.forDisplayed();
    await Element.init(cardNumber).actions.setText(
      loginData[market].cardNumber
    );
    await browser.switchToParentFrame();

    // FILL OUT EXPIRATION DATE
    await Element.init(cardExpiryIFrameElement).actions.switchToFrame();
    await Element.init(expireDate).actions.setText(
      loginData[market].expiryDate
    );
    await browser.switchToParentFrame();

    // FILL OUT CVV
    await browser.switchToFrame(cardCVVIFrameElement);
    await Element.init(cvc).actions.setText(loginData[market].cvccvv);
    await browser.switchToParentFrame();

    // NOTE: temporarily disabled on UAT
    // FILL OUT CARD HOLDER NAME
    // await setText(this.cardHolderName, cardHolderName)
  }
);
