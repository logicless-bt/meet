import { render, within } from '@testing-library/react';
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents.jsx';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<
            NumberOfEvents currentNOE = {32} 
            setCurrentNOE = {() => {}}
            setErrorAlert = {() => {}} 
    />);
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

describe('<NumberOfEvents /> integration', () => {
    test('# of events matches input', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NOEDOM = AppDOM.querySelector('#number-of-events');
        const textBox = within(NOEDOM).queryByRole('textbox');
        await user.click(textBox);
        await user.type(textBox, '{backspace}{backspace}10');

        const listItems = within(AppDOM).queryAllByRole('listitem');
        expect(listItems).toHaveLength(10);


    });

});