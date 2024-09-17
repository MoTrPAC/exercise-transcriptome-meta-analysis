import axios from 'axios';

export const SAVE_GENE_SEARCH_TERM = 'SAVE_GENE_SEARCH_TERM';
export const GENE_SEARCH_INPUT_CHANGE = 'GENE_SEARCH_INPUT_CHANGE';
export const GENE_SUGGESTIONS_FETCH = 'GENE_SUGGESTIONS_FETCH';
export const GENE_SUGGESTIONS_CLEAR = 'GENE_SUGGESTIONS_CLEAR';
export const GENE_SEARCH_SUBMIT = 'GENE_SEARCH_SUBMIT';
export const GENE_SEARCH_FAILURE = 'GENE_SEARCH_FAILURE';
export const GENE_SEARCH_SUCCESS = 'GENE_SEARCH_SUCCESS';
export const INPUT_FETCH_BEGIN = 'INPUT_FETCH_BEGIN';
export const INPUT_FETCH_END = 'INPUT_FETCH_END';

function saveGeneSearchTerm(geneSymbol) {
  return {
    type: SAVE_GENE_SEARCH_TERM,
    geneSymbol,
  };
}

function geneSearchInputChange(geneInputValue = '') {
  return {
    type: GENE_SEARCH_INPUT_CHANGE,
    inputValue: geneInputValue,
  };
}

function geneSuggestionsFetch(suggestions) {
  return {
    type: GENE_SUGGESTIONS_FETCH,
    geneSuggestions: suggestions,
  };
}

function geneSuggestionsClear() {
  return {
    type: GENE_SUGGESTIONS_CLEAR,
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

function inputFetchBegin() {
  return {
    type: INPUT_FETCH_BEGIN,
  };
}

function inputFetchEnd(inputFetchPayload) {
  return {
    type: INPUT_FETCH_END,
    inputFetchPayload,
  };
}

// Handler for predefined searches
function fetchGeneData(geneSymbol, geneId) {
  return (dispatch) => {
    dispatch(geneSearchSubmit(geneSymbol.toUpperCase()));
    return axios.get(`https://mygene.info/v3/gene/${geneId}?fields=name,summary`)
      .then((response) => {
        dispatch(geneSearchSuccess(response.data));
        dispatch(saveGeneSearchTerm(geneSymbol.toUpperCase()));
      })
      .catch((err) => {
        console.log(`${err.error}: ${err.errorDescription}`);
      });
  };
}

function useNull() {
  return null;
}

// Fetch local JSON source files for gene analysis input
function fetchAnalysisInput(geneSymbol) {
  return (dispatch) => {
    dispatch(inputFetchBegin());
    return axios
      .all([
        axios.get(
          `https://ds415vxwhii54.cloudfront.net/input/acute_blood/${geneSymbol.toUpperCase()}.json`
        ).catch(useNull),
        axios.get(
          `https://ds415vxwhii54.cloudfront.net/input/acute_muscle/${geneSymbol.toUpperCase()}.json`
        ).catch(useNull),
        axios.get(
          `https://ds415vxwhii54.cloudfront.net/input/longterm_blood/${geneSymbol.toUpperCase()}.json`
        ).catch(useNull),
        axios.get(
          `https://ds415vxwhii54.cloudfront.net/input/longterm_muscle/${geneSymbol.toUpperCase()}.json`
        ).catch(useNull),
      ])
      .then(
        axios.spread(
          (
            acuteBloodAnalysisInput,
            acuteMuscleAnalysisInput,
            longtermBloodAnalysisInput,
            longtermMuscleAnalysisInput,
          ) => {
            const payload = {
              acute_blood: acuteBloodAnalysisInput,
              acute_muscle: acuteMuscleAnalysisInput,
              longterm_blood: longtermBloodAnalysisInput,
              longterm_muscle: longtermMuscleAnalysisInput,
            };
            dispatch(inputFetchEnd(payload));
          }
        )
      );
  };
}

const AnalysisActions = {
  geneSearchInputChange,
  geneSuggestionsFetch,
  geneSuggestionsClear,
  geneSearchFailure,
  fetchGeneData,
  fetchAnalysisInput,
};

export default AnalysisActions;
