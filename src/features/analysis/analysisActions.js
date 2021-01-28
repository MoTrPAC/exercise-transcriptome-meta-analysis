import axios from 'axios';

export const SAVE_GENE_SEARCH_TERM = 'SAVE_GENE_SEARCH_TERM';
export const GENE_SEARCH_INPUT_CHANGE = 'GENE_SEARCH_INPUT_CHANGE';
export const GENE_SEARCH_SUBMIT = 'GENE_SEARCH_SUBMIT';
export const GENE_SEARCH_FAILURE = 'GENE_SEARCH_FAILURE';
export const GENE_SEARCH_SUCCESS = 'GENE_SEARCH_SUCCESS';

function saveGeneSearchTerm(geneSymbol) {
  return {
    type: SAVE_GENE_SEARCH_TERM,
    geneSymbol,
  };
}

function geneSearchInputChange(e) {
  return {
    type: GENE_SEARCH_INPUT_CHANGE,
    inputValue: e.target.value,
  };
}

function geneSearchSubmit(geneSymbol) {
  return {
    type: GENE_SEARCH_SUBMIT,
    geneSymbol,
  };
}

function geneSearchFailure(geneSearchError = '') {
  return {
    type: GENE_SEARCH_FAILURE,
    geneSearchError,
  };
}

function geneSearchSuccess(geneSearchPayload) {
  return {
    type: GENE_SEARCH_SUCCESS,
    geneSearchPayload,
  };
}

// Handler for predefined searches
function fetchGeneData(geneSymbol, geneId) {
  return (dispatch) => {
    dispatch(geneSearchSubmit(geneSymbol.toUpperCase()));
    return axios.get(`http://mygene.info/v3/gene/${geneId}?fields=name,summary`)
      .then((response) => {
        dispatch(geneSearchSuccess(response.data));
        dispatch(saveGeneSearchTerm(geneSymbol.toUpperCase()));
      })
      .catch((err) => {
        console.log(`${err.error}: ${err.errorDescription}`);
      });
  };
}

const AnalysisActions = {
  geneSearchInputChange,
  geneSearchFailure,
  fetchGeneData,
};

export default AnalysisActions;
