import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api.jsx';
import mockData from '../mock-data.jsx';


describe('<Event /> component', () => {
    let EventComponent;
    const sampleData = mockData;
    beforeEach(() => {
        EventComponent = render(<Event event={sampleData[0]}/>);
    });

    test('event details hidden by default', async () => {
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]} />);
        const details = EventComponent.queryByText('Details:');
        expect(details).not.toBeInTheDocument();
    });

    test('shows details when user clicks on Show Details button', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]} />);
        const detailsButton = EventComponent.getByText('Show Details');

        //user clicks show details
        await user.click(detailsButton);
        const details = EventComponent.getByText('Details:');
        expect(details).toBeInTheDocument();
    });

    test('renders event location', async () => {
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });


});