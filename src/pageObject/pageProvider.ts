import { loginDesktopPage } from "./desktop/login.page";
import { loginMobilePage } from "./mobile/login.page";
import { loginTabletPage } from "./tablet/login.page";
import { TPageName } from "../types";
import { DEVICES, PAGES } from "../support/constants/constants";
import { BasePage } from "./common/basePage";
import { checkoutDesktopPage } from "./desktop/checkout.page";

const PAGE_CONTAINER = {
  [DEVICES.DESKTOP]: {
    [PAGES.LOGIN]: loginDesktopPage,
    [PAGES.CHECKOUT]: checkoutDesktopPage,
  },

  [DEVICES.MOBILE]: {
    [PAGES.LOGIN]: loginMobilePage,
  },

  [DEVICES.TABLET]: {
    [PAGES.LOGIN]: loginTabletPage,
  },
};

export const getPage = <T extends BasePage>(pageName: TPageName): T => {

  const device = process.env.DEVICE as DEVICES;
  const pages = PAGE_CONTAINER[device];

  if (!(pageName in pages)) {
    throw new Error(
      `No such page with name "${pageName}" in list of pages, make sure ${pageName} registered in "PAGE_CONTAINER"`
    );
  }

  return pages[pageName] as T;
};
