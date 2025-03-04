import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event is collapsed by default.', ({ given, when, then }) => {
        let AppComponent
        given('the user has not clicked on any event,', () => {
            AppComponent = render(<App />);
        });

        when('the user views a list of events', async () => {
            await waitFor(() => {
                expect(screen.getByRole('list')).toBeInTheDocument();
            })
        });

        then('the events should not have all details visible.', async () => {
            const eventDetails = screen.queryAllByTestId('description');
            eventDetails.forEach((details) => {
              expect(details).not.toBeInTheDocument();
            });
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        let AppComponent;
        given('an event has not yet been expanded,', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
        });

        when('the user clicks on a button to show details', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const showDetailsButtons = within(AppDOM).queryAllByText('Show Details');
            user.click(showDetailsButtons[0])
        });

        then('the event will be expanded.', async () => {
            await waitFor(() => {
                expect(screen.getByTestId('description')).toBeInTheDocument();
              });
        });
    });

    test('User can collapse an event.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user has expanded an event,', async () => {
            const user = userEvent.setup();
            const allEvents = await getEvents();
            const EventComponent = render(<Event event={allEvents[0]} />)
            const showDetails = EventComponent.queryByText('Show details');
            await user.click(showDetails);
        });

        when('the user clicks on a button to hide details', async () => {
            const user = userEvent.setup();
            const allEvents = await getEvents();
            const EventComponent = render(<Event event={allEvents[0]} />)
            const hideDetails = EventComponent.queryByText('Hide details');
            await user.click(hideDetails);
        });

        then('the event will be collapsed.', async () => {
            let AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
});