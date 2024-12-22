export type TMarket = "us" | "uk" | "fr" | "tw" | "hk";

export type TLoginData = {
  [key in TMarket]: ILoginData;
};

export type TPaymentDetails = {
  [key in TMarket]: IPaymentDetails;
};

export type TEditData = {
  [key in TMarket]: IEditData;
};

export type TProductSearchDetails = {
  [key in TMarket]: IProductSearchDetails;
};

export type TSiteData = {
  [key in TMarket]: ISiteData;
};

export type TValidationMessage = {
  [key in TMarket]: IValidationMessage;
};

export interface ILoginData {
  addressLine1: string;
  addressLine2: string;
  emailAddress: string;
  guestEmail: string;
  email1: string;
  email2: string;
  email3: string;
  email4: string;
  email5: string;
  email6: string;
  email7: string;
  email8: string;
  email9: string;
  email10: string;
  prodEmailAddress: string;
  title: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  state: string;
  city: string;
  zipCode: string;
  password: string;
  emailSub: string;
  editEmailSub: string;
  engagementDay: string;
  engagementMonth: string;
  engagementYear: string;
  contactReason: string;
  contactMessage: string;
}

export interface IPaymentDetails {
  cardNumberAmex: string;
  cardNumberDiscover: string;
  cardNumberVisa: string;
  cardNumberMasterCard: string;
  expiryDate: string;
  cvccvv: string;
  cvccvvAmex: string;
  cvccvvVisa: string;
  payPalEmail: string;
  payPalPassword: string;
  klarnaPhoneNumber?: string;
  klarnaOtp?: string;
  affirmPhoneNumber?: string;
  affirmOtp?: string;
  cardHolderName?: string;
}

export interface IEditData {
  addressLine1: string;
  addressLine2: string;
  emailAddress: string;
  prodEmailAddress: string;
  title: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  state: string;
  city: string;
  zipCode: string;
  password: string;
  emailSub: string;
  editEmailSub: string;
  engagementDay: string;
  engagementMonth: string;
  engagementYear: string;
  engagementDate: string;
}

export interface IProductSearchDetails {
  productSKU: string;
  categorySearch: string;
  productSearch: string;
  recommendCatResult: string;
  productSearchResult: string;
  productRecommResult: string;
  invalidProductSearchResult: string;
  categoriesSearchResultsText: string;
  collectionsSearchResultsText: string;
  productsSearchResultsText: string;
}

export interface ISiteData {
  url: string;
  rings: string;
  pdpKlarnaSKU?: string;
  pdpAffirmSKU?: string;
  pdpSKU: string;
  uppSKU: string;
  uppSKU1: string;
  uppClassicSKU: string;
  uppClassicRoundPendantSKU: string;
  cardDetails: string;
  expiryDate: string;
  cvccvv: string;
  home: string;
  domain: string;
  bookAppointment: string;
  clientServices: string;
  location: string;
}

export interface IValidationMessage {
  loginButton: string;
  loginEmailRequired: string;
  loginPasswordRequired: string;
  loginEmailInvalid: string;
  loginInvalidEmailPassword: string;
  loginInsertEmail: string;
  loginInvalidEmail: string;
  welcomeText: string;
  createAccountButton: string;
  checkoutBagIsEmpty: string;
  checkoutClickAndCollectText: string;
  checkoutGiftOptionLabel: string;
  checkoutOrderConfirmation: string;
  checkoutCreateAccountText: string;
  createAccountInvalidInfo: string;
  estimatedDeliveryText: string;
  contactFormConfirmationText: string;
  callRequestFormConfirmationText?: string;
}
