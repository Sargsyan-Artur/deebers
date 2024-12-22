import { Element } from "../../support/element";
import { LoginDesktop } from "../desktop/login.page";
import { LoginMobile } from "../mobile/login.page";
import { BasePage } from "../common/basePage";

export class LoginTablet extends BasePage {
  loginDesktop: LoginDesktop;
  loginMobile: LoginMobile;

  constructor() {
    super();
    this.loginDesktop = new LoginDesktop();
    this.loginMobile = new LoginMobile();
  }

  get buttons() {
    return {
      ...this.loginDesktop.buttons,
      hamburgerMenu: this.loginMobile.hamburgerMenu,
      loginSubmit: this.loginSubmit,
      myAccount: this.loginMobile.myAccount,
      logout: this.loginMobile.logout,
      rememberMeCheckbox: this.rememberMeCheckbox,
    };
  }

  get inputs() {
    return {
      ...this.loginDesktop.inputs,
      initialEmail: this.loginDesktop.guestEmail,
      initialPassword: this.loginDesktop.guestPassword,
    };
  }

  get rememberMeCheckbox() {
    return $("#rememberMe~p");
  }

  get loginSubmit() {
    return $("#phantomRecaptchaLoginForm");
  }

  async goToMyAccount(): Promise<void> {
    await Element.init(this.buttons.hamburgerMenu).actions.click();
    await Element.init(this.buttons.myAccount).actions.click();
  }
}
export const loginTabletPage = new LoginTablet();
