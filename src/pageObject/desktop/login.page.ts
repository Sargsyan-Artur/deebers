import { BasePage } from "../common/basePage";
import { Element } from "../../support/element";

export class LoginDesktop extends BasePage {
  get buttons() {
    return {
      myAccount: this.myAccount,
      loginSubmit: this.loginSubmit,
      rememberMeCheckbox: this.rememberMeCheckbox,
      logout: this.logout,
    };
  }

  get inputs() {
    return {
      initialEmail: this.initialEmail,
      initialPassword: this.initialPassword,
      guestEmail: this.guestEmail,
      guestPassword: this.guestPassword,
    };
  }

  get myAccount() {
    return $("#headerMyAccount button");
  }
  get initialEmail() {
    return $("#login-form-email-modal");
  }
  get initialPassword() {
    return $("#login-form-password-modal");
  }
  get loginSubmit() {
    return $("#phantomRecaptchaLoginFormModal");
  }
  get rememberMeCheckbox() {
    return $(
      "form.accountLogin.loginModal > div.clearfix.mt-5 > div > label > p"
    );
  }

  get logout() {
    return $("a.logout-link");
  }
  get guestEmail() {
    return $("#login-form-email");
  }
  get guestPassword() {
    return $("#login-form-password");
  }

  async goToMyAccount(): Promise<void> {
    await Element.init(this.myAccount).actions.click();
  }
}

export const loginDesktopPage = new LoginDesktop();
