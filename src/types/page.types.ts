import { LoginMobile } from "../pageObject/mobile/login.page";
import { LoginTablet } from "../pageObject/tablet/login.page";
import { LoginDesktop } from "../pageObject/desktop/login.page";
import { CheckoutDesktop } from "../pageObject/desktop/checkout.page";

export type TLogin = LoginMobile | LoginTablet | LoginDesktop;
export type TCheckout = CheckoutDesktop;
