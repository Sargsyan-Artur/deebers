@regression
Feature: Checkout as Existing/Guest customer
  As a user Existing/Guest
  I want to be able to buy a product that I've added to my basket

  @wip
  Scenario Outline: Guest customer can add SPP to the basket and successfully checkout as a guest and new customer on <market>
    Given User navigates to "pdpSKU" page on <market> market
    Then User clicks Select Size button on Checkout page with wait

    And User double clicks Size checkbox with index 2 on Checkout page
    And User clicks Size checkbox with index 2 on Checkout page


    And User clicks Add To Bag button on Checkout page after clickable
    And User clicks Shopping Bag button on Checkout page after clickable
    And User clicks Continue To Checkout button on Checkout page
    And User fills login password as <market> "guest" in checkout page
    And User clicks Checkout As Guest button on Checkout page

    And User selects Title dropDown on Checkout page in <market> by "title"

#    When I fill in the delivery detail form in "<market>" with valid details
    When User fills Login Data in <market> market
      | Detail       | Element       | ElementType | Page     |
      | firstName    | First Name    | input       | Checkout |
      | lastName     | Last Name     | input       | Checkout |
      | phoneNumber  | Mobile Number | input       | Checkout |
      | countryCode  | Country Code  | input       | Checkout |
      | addressLine1 | Address       | input       | Checkout |
      | state        | County        | input       | Checkout |
      | city         | City          | input       | Checkout |
      | zipCode      | Zip Code      | input       | Checkout |
    And User clicks Continue To Payment button on Checkout page after scrolling
    When User fills Payment Data in <market> market
      | Detail         | Element       | ElementType | Page     |
      | cardNumberAmex | Card Number   | input       | Checkout |
      | expiryDate     | Expiry Date   | input       | Checkout |
      | cvccvv         | Security Code | input       | Checkout |

    And User clicks Continue To Review button on Checkout page


    Examples:
      | market |
#      | us     |
      | uk     |
#      | fr     |
#      | hk     |
#      | tw     |