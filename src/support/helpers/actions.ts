import { PAUSE_TIMEOUT5, PAUSE_TIMEOUT2 } from "../constants/constants";
import { TElement } from "../../types";

export class Actions {
  constructor(private readonly element: TElement) {}

  async click(timeout = PAUSE_TIMEOUT5) {
    await this.element.waitForExist({ timeout });
    return await this.element.click();
  }

  async clickAfter(action: string, timeout = PAUSE_TIMEOUT5) {
    switch (action) {
      case "displaying":
        await this.element.waitForDisplayed({ timeout });
        break;
      case "existing":
        await this.element.waitForExist({ timeout });
        break;
      case "clickable":
        await this.element.waitForClickable({ timeout });
        break;
      case "scrolling":
        await this.element.scrollIntoView({
          inline: "center",
          block: "center",
        });
        await this.element.waitForDisplayed({ timeout });
        break;
    }
    await this.element.waitForClickable({ timeout });
    return await this.element.click();
  }

  async selectByText(text: string) {
    return await this.element.selectByVisibleText(text);
  }

  async doubleClick(timeout = PAUSE_TIMEOUT5) {
    await this.element.scrollIntoView({ inline: "center", block: "center" });
    await this.element.waitForClickable({ timeout });
    return await this.element.click();
  }

  async getElementText(timeout = PAUSE_TIMEOUT5) {
    await this.element.waitForExist({ timeout });
    return await this.element.getText();
  }

  async getElementValue(timeout = PAUSE_TIMEOUT5) {
    await this.element.waitForExist({ timeout });
    return await this.element.getValue();
  }

  async setText(text: string, timeout = PAUSE_TIMEOUT5) {
    await this.element.waitForExist({ timeout });
    return await this.element.setValue(text);
  }

  async scrollInToView() {
    await this.element.waitForExist({ timeout: PAUSE_TIMEOUT2 });
    return await this.element.scrollIntoView({
      inline: "center",
      block: "center",
    });
  }

  async switchToFrame() {
    return await browser.switchToFrame(this.element);
  }
}
