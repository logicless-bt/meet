Feature: Show and Hide Event Details
    Scenario: An event is collapsed by default.
        Given the user has not clicked on any event,
        When the user views a list of events
        Then the events should not have all details visible.
    
    Scenario: User can expand an event to see details.
        Given an event has not yet been expanded,
        When the user clicks on a button to show details
        Then the event will be expanded.

    Scenario: User can collapse an event.
        Given the user has expanded an event,
        When the user clicks on a button to hide details
        Then the event will be collapsed.