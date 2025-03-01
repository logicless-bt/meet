import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, fireEvent, within } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When the user hasn\'t specified a number, 32 events are displayed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user has not specified a number,', () => {
            AppComponent=render(<App />);
        });

        when('the user views a list of events', () => {
            //intentionally empty
        });

        then(/^(\d+) events will be shown.$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32); 
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        given('the user is browsing a list of events,', () => {
            AppComponent = render(<App />);
        });

        when('the user specifies a list of events', () => {
            const AppDOM = AppComponent.container.firstChild;
            const numberOfEventsInput = within(AppDOM).getByLabelText('# of Events:');
            fireEvent.change(numberOfEventsInput, { target: { value: 3 } });
        });

        then('that many events will be shown at maximum.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(3);
            });
        });
    });
});