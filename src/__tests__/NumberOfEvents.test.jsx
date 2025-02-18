import { render } from '@testing-library/react';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents.jsx';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test('renders with the role of textbox', () => {
        const textBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(textBox).toBeInTheDocument();
    });

    test('the default value is 32', () => {
        const textBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(textBox).toHaveValue('32');
    });

    test('number changes when user inputs', async () => {
        const user = userEvent.setup();
        const textBox = NumberOfEventsComponent.queryByRole('textbox');
        await user.type(textBox, `10`);
    });
});