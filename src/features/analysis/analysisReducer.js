import {
  SAVE_GENE_SEARCH_TERM,
  GENE_SEARCH_INPUT_CHANGE,
  GENE_SEARCH_SUBMIT,
  GENE_SEARCH_FAILURE,
  GENE_SEARCH_SUCCESS,
} from './analysisActions';

export const defaultAnalysisState = {
  savedGeneSearches: [],
  geneSearchPayload: {},
  geneSearchError: null,
  geneSearchInput: '',
  geneSymbol: '',
  isGeneSearchInProgress: false,
};

export default function AnalysisReducer(
  state = { ...defaultAnalysisState },
  action
) {
  switch (action.type) {
    // Save list of successful searched gene symbols
    case SAVE_GENE_SEARCH_TERM: {
      const newList = [...state.savedGeneSearches];
      if (newList.indexOf(action.geneSymbol) < 0) {
        newList.push(action.geneSymbol);
      }

      return {
        ...state,
        savedGeneSearches: newList,
      };
    }
    // Handle form input change event
    case GENE_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        geneSearchInput: action.inputValue,
      };

    // Handle form submit event
    case GENE_SEARCH_SUBMIT:
      return {
        ...state,
        geneSymbol: action.geneSymbol,
        isGeneSearchInProgress: true,
        geneSearchError: null,
      };

    // Handle form submit error
    case GENE_SEARCH_FAILURE:
      return {
        ...state,
        geneSearchError: action.geneSearchError,
        isGeneSearchInProgress: false,
      };

    // Hanlde query response
    case GENE_SEARCH_SUCCESS:
      return {
        ...state,
        geneSearchPayload: action.geneSearchPayload,
        isGeneSearchInProgress: false,
        geneSearchError: null,
      };
    default:
      return state;
  }
}
