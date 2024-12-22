import { When } from "@wdio/cucumber-framework";
import { ILoginData, TLogin } from "../../src/types";
import { getPage } from "../../src/pageObject/pageProvider";
import { PAGES, PAUSE_TIMEOUT10 } from "../../src/support/constants/constants";
import { Element } from "../../src/support/element";

When(
  "User fills login password for {loginDataByMarket} user",
  async (loginData: ILoginData) => {
    const page = getPage<TLogin>(PAGES.LOGIN);
    const loginElem = page.inputs.initialEmail;
    const passwordElem = page.inputs.initialPassword;

    await Element.init(loginElem).actions.setText(
      loginData.emailAddress,
      PAUSE_TIMEOUT10
    );
    await Element.init(passwordElem).actions.setText(
      loginData.password,
      PAUSE_TIMEOUT10
    );
  }
);
