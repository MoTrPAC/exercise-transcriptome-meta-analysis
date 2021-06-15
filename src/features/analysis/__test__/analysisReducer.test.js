import AnalysisReducer, { defaultAnalysisState } from '../analysisReducer';
import {
  SAVE_GENE_SEARCH_TERM,
  GENE_SEARCH_INPUT_CHANGE,
  GENE_SUGGESTIONS_FETCH,
  GENE_SUGGESTIONS_CLEAR,
} from '../analysisActions';

const geneSearchInputChangeAction = {
  type: GENE_SEARCH_INPUT_CHANGE,
  inputValue: 'VEGFA',
};

const saveGeneSearchTermAction = {
  type: SAVE_GENE_SEARCH_TERM,
  geneSymbol: 'VEGFA',
};

const geneSuggestionsFetchAction = {
  type: GENE_SUGGESTIONS_FETCH,
  geneSuggestions: ['VEGFA', 'VEGFB'],
}

const geneSuggestionsClearAction = {
  type: GENE_SUGGESTIONS_CLEAR,
}

describe('Analysis Reducer', () => {
  test('should return the initial state', () => {
    expect(AnalysisReducer(defaultAnalysisState, {})).toEqual(defaultAnalysisState);
  });
  test('should handle GENE_SEARCH_INPUT_CHANGE', () => {
    const newState = {
      ...defaultAnalysisState,
      geneSearchInput: geneSearchInputChangeAction.inputValue,
    };
    expect(AnalysisReducer(newState, geneSearchInputChangeAction).geneSearchInput).toEqual('VEGFA');
  });
  test('should handle SAVE_GENE_SEARCH_TERM', () => {
    const newState = {
      ...defaultAnalysisState,
      geneSymbol: saveGeneSearchTermAction.geneSymbol,
    };
    expect(AnalysisReducer(newState, saveGeneSearchTermAction).geneSymbol).toEqual('VEGFA');
  });
  test('should handle GENE_SUGGESTIONS_FETCH', () => {
    const newState = {
      ...defaultAnalysisState,
      geneSuggestions: geneSuggestionsFetchAction.geneSuggestions,
    };
    expect(AnalysisReducer(newState, geneSuggestionsFetchAction).geneSuggestions).toEqual(['VEGFA', 'VEGFB']);
  });
  test('should handle GENE_SUGGESTIONS_CLEAR', () => {
    const newState = {
      ...defaultAnalysisState,
      geneSuggestions: ['VEGFA', 'VEGFB'],
    };
    expect(AnalysisReducer(newState, geneSuggestionsClearAction)).toEqual(defaultAnalysisState);
  });
});
