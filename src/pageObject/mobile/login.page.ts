import { Element } from '../../support/element';
import { LoginDesktop } from '../desktop/login.page';
import { BasePage } from '../common/basePage';

export class LoginMobile extends BasePage {
  loginDesktop: LoginDesktop;

  constructor () {
    super();
    this.loginDesktop = new LoginDesktop();
  }

  get buttons () {
    return {
      ...this.loginDesktop.buttons,
      hamburgerMenu: this.hamburgerMenu,
      loginSubmit: this.loginSubmit,
      myAccount: this.myAccount,
      logout: this.logout,
      rememberMeCheckbox: this.rememberMeCheckbox
    };
  }

  get inputs () {
    return {
      ...this.loginDesktop.inputs,
      initialEmail: this.initialEmail,
      initialPassword: this.initialPassword
    };
  }

  get hamburgerMenu () {
    return $('#header-links-mobile [data-target="#headerMenu1"]');
  }

  get initialEmail () {
    return $('#login-form-email-mobile');
  }

  get initialPassword () {
    return $('#login-form-password-mobile');
  }

  get loginSubmit () {
    return $('#phantomRecaptchaLoginFormMobile');
  }

  get myAccount () {
    return $('#headerMenu1 .loginIcon');
  }

  get logout () {
    return $('.account-footer button');
  }

  get rememberMeCheckbox () {
    return $('.loginMobile .dbj-checkbox');
  }

  async goToMyAccount (): Promise<void> {
    await Element.init(this.hamburgerMenu).actions.click();
    await Element.init(this.myAccount).actions.click();
  }
}

export const loginMobilePage = new LoginMobile();
