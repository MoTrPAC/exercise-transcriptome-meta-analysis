import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../../app/configureStore';
import AnalysisConnected from '../analysis';
import { defaultAnalysisState } from '../analysisReducer';

const store = configureStore();

const analysisActions = {
  handleGeneSearchInputChange: jest.fn(),
  handleGeneSuggestionsFetch: jest.fn(),
  handleGeneSuggestionsClear: jest.fn(),
  geneSearchFailure: jest.fn(),
  fetchGeneData: jest.fn(),
  fetchAnalysisInput: jest.fn(),
};

describe('Main analysis page', () => {
  test('page rendering with initial state', () => {
    render (
      <Provider store={store}>
        <Router>
          <AnalysisConnected
            { ...defaultAnalysisState }
            { ...analysisActions }
          />
        </Router>
      </Provider>
    );

    // verify page content
    expect(screen.getByText(/Open access article published/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search a gene for analysis/i)).toBeInTheDocument();
  });
});
