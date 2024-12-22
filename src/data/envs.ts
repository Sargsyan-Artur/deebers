import dotenv from 'dotenv';
dotenv.config();

export const uatBaseUrl = `https://${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}@development.debeers.`;
export const sandboxBaseUrl = `https://${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}@bdbt-007.dx.commercecloud.salesforce.com`;
export const demoBaseUrlBsu = `https://${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}@bdbt-004.dx.commercecloud.salesforce.com`;
export const paypalbaseUrl = 'https://www.sandbox.paypal.com';
