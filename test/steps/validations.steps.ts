import { Then } from "@wdio/cucumber-framework";
import { TElement, TTextCondition, ILoginData } from "../../src/types";
import { Element } from "../../src/support/element";

Then('The {locator} text should {textCondition} {string}', async (element: TElement, condition: TTextCondition, expectedText: string) => {
    const text = await Element.init(element).actions.getElementText()
    await Element.init(element).expect.textToBe(text, condition, expectedText)
});

Then('The {locator} value should {textCondition} {string}', async (element: TElement, condition: TTextCondition, expectedText: string) => {
    const value = await Element.init(element).actions.getElementValue()
    await Element.init(element).expect.textToBe(value, condition, expectedText)
});

Then('The {locator} value should {textCondition} of {loginDataByMarket} email', async (element: TElement, condition: TTextCondition, loginData: ILoginData) => {
    const value = await Element.init(element).actions.getElementValue()
    await Element.init(element).expect.textToBe(value, condition, loginData.emailAddress)
});