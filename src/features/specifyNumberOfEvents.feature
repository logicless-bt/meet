Feature: the user can control how many events are displayed.
    Scenario: When the user hasn't specified a number, 32 events are displayed by default.
        Given the user has not specified a number,
        When the user views a list of events
        Then 32 events will be shown.

    Scenario: User can change the number of events displayed.
        Given the user is browsing a list of events,    
        When the user specifies a list of events
        Then that many events will be shown at maximum.