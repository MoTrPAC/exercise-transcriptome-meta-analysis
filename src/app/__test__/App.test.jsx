import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from '../App';

const store = configureStore();

test('renders app name text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Exercise Transcriptome Meta-analysis/i)).toBeInTheDocument();
});
