import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from '../App';

const store = configureStore();

// Mocking Google Analytics
jest.mock('ga-gtag');

describe('ExtraMeta', () => {
  test('full app rendering/navigating', async () => {
    const user = userEvent.setup();
    render (
      <Provider store={store}>
        <App />
      </Provider>
    );

    // verify page content for expected route
    expect(screen.getByText(/Meta-analysis of published exercise transcriptome data/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    await user.click(screen.getByText(/about/i), leftClick);

    // check that the content changed to the new page
    expect(screen.getByText(/About this site/i)).toBeInTheDocument();
  });
});
