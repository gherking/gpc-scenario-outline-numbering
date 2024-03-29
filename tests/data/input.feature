Feature: Test feature file for login
  feature description

  Rule: Test rule
    Background: Opening login page
      Given the login page is opened

    Scenario Outline: Login with <user> without logout
      And username is filled with <username>
      And password is filled with <password>
      And login button is clicked
      Then the profile page of <user> should be loaded
        """
        logout
        """
      And the following menu items should be displayed
        | logout |

      Examples:
        | user   | username | password |
        | user_1 | user1    | pwd1     |
        | user_2 | user2    | pwd2     |

    @logout
    Scenario: Testing logout
      And username is filled with <username>
      And password is filled filth <pwd>
      And login button is clicked
      Then the profile page of <user> should be loaded
      When the sign out is clicked
      Then the user should be logged out

    Scenario Outline: Login with <user>
      And username is filled with <username>
      And password is filled with <password>
      And login button is clicked
      Then the profile page of <user> should be loaded
        """
        logout
        """
      And the following menu items should be displayed
        | logout |

      Examples:
        | num | user | username | password |
        | 1   | user | user     | pwd      |
