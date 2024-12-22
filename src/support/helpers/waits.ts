import {
  PAUSE_TIMEOUT4,
  PAUSE_TIMEOUT6,
  SPINNER_TIMEOUT,
} from "../constants/constants";
import { TElement } from "../../types";

export class Waits {
  constructor(private readonly element: TElement) {}

  async forExist(timeout = PAUSE_TIMEOUT4) {
    return await this.element.waitForExist({ timeout });
  }

  async forDisplayed(timeout = PAUSE_TIMEOUT4) {
    await this.element.waitForDisplayed({ timeout });
  }

  async forDisappear() {
    try {
      await browser.waitUntil(async () => await this.element.isExisting(), {
        timeout: PAUSE_TIMEOUT6,
        timeoutMsg: "Error waiting for spinner to appear",
      });

      await this.element.waitForDisplayed({
        reverse: true,
        timeout: SPINNER_TIMEOUT,
        timeoutMsg: "Error waiting for spinner to disappear",
      });
    } catch (e) {}
  }
}
