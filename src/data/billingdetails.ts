import { TPaymentDetails } from '../types';

export const paymentDetails: TPaymentDetails = {
  uk: {
    cardNumberAmex: '3700 0000 0100 018',
    cardNumberDiscover: '',
    cardNumberVisa: '4444 3333 2222 1111',
    cardNumberMasterCard: '5555 4444 3333 1111',
    expiryDate: '03/30',
    cvccvv: '737',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    cardHolderName: 'John Doe',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20',
    klarnaPhoneNumber: '1234567890',
    klarnaOtp: '111111'
  },
  us: {
    cardNumberAmex: '3700 0000 0100 018',
    cardNumberDiscover: '6011 6011 6011 6611',
    cardNumberVisa: '4111 1111 4555 1142',
    cardNumberMasterCard: '2222 4000 6000 0007',
    expiryDate: '03/30',
    cvccvv: '7373',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    cardHolderName: 'John Doe',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20',
    affirmPhoneNumber: '202-555-0181',
    affirmOtp: '1234'
  },
  fr: {
    cardNumberAmex: '3700 0000 0100 018',
    cardNumberDiscover: '',
    cardNumberVisa: '5555 3412 4444 1115',
    cardNumberMasterCard: '',
    expiryDate: '03/30',
    cvccvv: '737',
    cvccvvAmex: '7373',
    cvccvvVisa: '737',
    cardHolderName: 'John Doe',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  tw: {
    cardNumberAmex: '3700 0000 0100 018',
    cardNumberDiscover: '',
    cardNumberVisa: '4111 1111 4555 1142',
    cardNumberMasterCard: '',
    expiryDate: '03/30',
    cvccvv: '737',
    cvccvvAmex: '7373',
    cvccvvVisa: '737',
    cardHolderName: 'John Doe',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  hk: {
    cardNumberAmex: '3700 0000 0100 018',
    cardNumberDiscover: '',
    cardNumberVisa: '4111 1111 4555 1142',
    cardNumberMasterCard: '',
    expiryDate: '0330',
    cvccvv: '737',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    cardHolderName: 'John Doe',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  }
};

export const invalidPaymentDetails: TPaymentDetails = {
  uk: {
    cardNumberAmex: '3782 822463 10005',
    cardNumberDiscover: '',
    cardNumberVisa: '4999 9999 9999 9996',
    cardNumberMasterCard: '5431 1111 1111 1228',
    expiryDate: '05/23',
    cvccvv: '737',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  us: {
    cardNumberAmex: '3782 822463 10005',
    cardNumberDiscover: '6011 6011 6011 6611',
    cardNumberVisa: '4999 9999 9999 9996',
    cardNumberMasterCard: '5431 1111 1111 1228',
    expiryDate: '05/23',
    cvccvv: '7373',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  fr: {
    cardNumberAmex: '3782 822463 10005',
    cardNumberDiscover: '',
    cardNumberVisa: '4999 9999 9999 9996',
    cardNumberMasterCard: '5431 1111 1111 1228',
    expiryDate: '05/23',
    cvccvv: '737',
    cvccvvAmex: '7373',
    cvccvvVisa: '737',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  tw: {
    cardNumberAmex: '3782 822463 10005',
    cardNumberDiscover: '',
    cardNumberVisa: '4999 9999 9999 9996',
    cardNumberMasterCard: '5431 1111 1111 1228',
    expiryDate: '05/23',
    cvccvv: '737',
    cvccvvAmex: '7373',
    cvccvvVisa: '737',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  },
  hk: {
    cardNumberAmex: '3782 822463 10005',
    cardNumberDiscover: '',
    cardNumberVisa: '4999 9999 9999 9996',
    cardNumberMasterCard: '5431 1111 1111 1228',
    expiryDate: '0523',
    cvccvv: '737',
    cvccvvVisa: '737',
    cvccvvAmex: '7373',
    payPalEmail: 'sb-qdeao3399762@personal.example.com',
    payPalPassword: 'paypal20'
  }
};
