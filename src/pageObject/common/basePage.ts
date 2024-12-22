import { TElementCollections, TElement } from "../../types";
import { ELEMENT_COLLECTIONS } from "../../support/constants/constants";

export abstract class BasePage {
  abstract get buttons(): { [key: string]: TElement | Function };
  abstract get inputs(): { [key: string]: TElement | Function };
  abstract get checkboxes(): { [key: string]: TElement | Function };
  abstract get dropDowns(): { [key: string]: TElement | Function };

  get internationalSitesPopUpContinueButton() {
    return $("#customCountry-continueOn-button span");
  }

  get cancelCookiePopUpButton() {
    return $("#customCountry-continueOn-button span");
  }

  get cancelNewsletterButton() {
    return $(".close-modal > i:nth-child(1)");
  }

  get spinner() {
    return $(".spinner");
  }

  overlay = {
    spinner: this.spinner,
    internationalSitesPopUpContinueButton:
      this.internationalSitesPopUpContinueButton,
    cancelCookiePopUpButton: this.cancelCookiePopUpButton,
    cancelNewsletterButton: this.cancelNewsletterButton,
  };

  protected getElementsCollection(elementCollection: TElementCollections) {
    let elements;
    switch (elementCollection) {
      case ELEMENT_COLLECTIONS.BUTTONS:
        elements = this.buttons;
        break;
      case ELEMENT_COLLECTIONS.INPUTS:
        elements = this.inputs;
        break;
      case ELEMENT_COLLECTIONS.OVERLAY:
        elements = this.overlay;
        break;
      case ELEMENT_COLLECTIONS.CHECKBOX:
        elements = this.checkboxes;
        break;
      case ELEMENT_COLLECTIONS.DROPDOWN:
        elements = this.dropDowns;
        break;
      default:
        throw new Error(
          `No such collection with name "${elementCollection}" . Class - ${this.constructor.name}.`
        );
    }

    return elements;
  }

  public getElement(
    elementName: string,
    elementCollection: TElementCollections
  ) {
    const elements = this.getElementsCollection(elementCollection);

    if (!(elementName in elements)) {
      throw new Error(
        `No such "${elementCollection}" with name "${elementName}". Class - ${this.constructor.name}.`
      );
    }

    return elements[elementName];
  }
}
