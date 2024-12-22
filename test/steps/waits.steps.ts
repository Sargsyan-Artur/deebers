import { When } from "@wdio/cucumber-framework";
import { Element } from "../../src/support/element";
import { TElement } from "../../src/types";

When("User waits for {locator} disappear", async (elem: TElement) => {
  await Element.init(elem).wait.forDisappear();
});
