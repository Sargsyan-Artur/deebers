import { BasePage } from "../common/basePage";

export class CheckoutDesktop extends BasePage {
  get buttons() {
    return {
      "Select Size": this.selectSize,
      "Add To Bag": this.addToBag,
      "Shopping Bag": this.basket,
      "Continue To Checkout": this.continueToCheckout,
      "Checkout As Guest": this.checkoutAsGuest,
      "Continue To Payment": this.continueToPayment,
      "Continue To Review": this.continueToReview,
    };
  }

  get inputs() {
    return {
      email: this.email,
      password: this.password,
      "First Name": this.firstName,
      "Last Name": this.lastName,
      "Mobile Number": this.phoneNumber,
      "Country Code": this.countryCode,
      Address: this.address,
      City: this.city,
      "Zip Code": this.zipcode,
      County: this.countyInput,
      "Card Number": this.cardNumberInput,
      "Expiry Date": this.expiryDateInput,
      "Security Code": this.securityCodeInput,
    };
  }

  get checkboxes() {
    return {
      "First Size": this.firstSize,
      Size: this.size,
    };
  }

  get dropDowns() {
    return {
      Title: this.title,
    };
  }

  get selectSize() {
    return $('.product-info__action-buttons [data-bs-target="#pdpSizes"]');
  }

  get addToBag() {
    return $(".pdp-variation-size__footer .btn-addToBag");
  }

  get basket() {
    return $(".minicart a");
  }

  get continueToCheckout() {
    return $(".checkout-btn");
  }
  get email() {
    return $("#email");
  }
  get password() {
    return $("#password");
  }

  size(index) {
    return $(`(//div[@class= "pdp-variation-size__item"]/button)[${index}]`);
  }

  // (//div[@class='pdp-variation-size__item'])[1]/button
  //     size (index) { return $(`(//div[@class='pdp-variation-size__item'])[1]/button`) }
  get firstSize() {
    return $("(//div[@class='pdp-variation-size__item'])[1]/button");
  }

  get checkoutAsGuest() {
    return $("#submitGuestCustomer");
  }

  get title() {
    return $('(//select[@id = "customerTitle"])[1]');
  }

  get address() {
    return $(".single-shipping #shippingAddressOne");
  }

  get firstName() {
    return $('(//input[@id = "shippingFirstName"])[1]');
  }

  get lastName() {
    return $('(//input[@id = "shippingLastName"])[1]');
  }

  get countryCode() {
    return $('(//input[@id = "accountMobileCountryCode"])[1]');
  }

  get phoneNumber() {
    return $('(//input[@id = "accountMobilePhoneNumber"])[1]');
  }

  get city() {
    return $('(//input[@id = "shippingAddressCity"])[1]');
  }

  get zipcode() {
    return $(".single-shipping #shippingZipCode");
  }

  get userStateDropdowns() {
    return $('(//select[@id = "state"])[1]');
  }

  get countyInput() {
    return $(".single-shipping #shippingState");
  }

  get continueToPayment() {
    return $(".review-card .submit-shipping");
  }

  get cardNumberInput() {
    return $('[data-cse="encryptedCardNumber"]');
  }
  get expiryDateInput() {
    return $('[data-cse="encryptedExpiryDate"]');
  }
  get securityCodeInput() {
    return $('[data-cse="encryptedSecurityCode"]');
  }

  get continueToReview() {
    return $(".review-card .submit-payment");
  }
}

export const checkoutDesktopPage = new CheckoutDesktop();
