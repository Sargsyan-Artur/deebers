#@login
#Feature: Login
#
#  As a user
#  I want to be able Login
#
#
#  Scenario Outline: Guest customer goes to book an appointment in-store <market>
#    Given User navigates to "home" page on <market> market
#    And User goes to login page
#    And User fills login password for <market> user
#    And User clicks Login page rememberMeCheckbox button
#    And User clicks Login page loginSubmit button
#    And User wait for Login page spinner overlay disappear
#    And User clicks Login page logout button element with wait
#    And User goes to login page
#
#    # both ways can be used for checking emails
#    # this way we should pass email directly from cucumber (this step can be used for checking all kind of text not only for email)
#    Then The Login page initialEmail input value should be "<email>"
#    # this step is written for checking only emails
#    Then The Login page initialEmail input value should be of <market> email
#    Examples:
#      | market | email                      |
#      | us     | debeers.test+us1@gmail.com |
#      | uk     | debeers.test+uk1@gmail.com  |
#      | fr     | debeers.test+fr1@gmail.com  |
#      | hk     | debeers.test+hk1@gmail.com  |
#      | tw     | debeers.test+tw1@gmail.com  |
