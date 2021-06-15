import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../../app/configureStore';
import About from '../about';

const store = configureStore();

describe('About page', () => {
  test('page rendering with expected content', () => {
    render (
      <Provider store={store}>
        <Router>
          <About />
        </Router>
      </Provider>
    );

    // verify page content
    expect(screen.getByText(/Open access article published/i)).toBeInTheDocument();
    expect(screen.getByText(/About this site/i)).toBeInTheDocument();
  });
});
