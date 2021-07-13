import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import getSuggestions, { getSuggestionValue, renderSuggestion } from '../../lib/auto-suggest';
import roundNumbers from '../../lib/round-numbers';
import AnalysisActions from './analysisActions';
import MetaAnalysisGenes, { summaryStats } from '../../data/metaAnalysis';
import ProgressIndicator from '../../components/progress-indicator';
import PublicationBanner from '../../components/publication-banner';

/**
 * Functional component to render human meta-analysis acute muscle data visualization
 * It uses internal states not shared by other components
 *
 * @return {Object} JSX representation of the meta analysis data visualization
 */
function Analysis({
  savedGeneSearches,
  geneSearchPayload,
  geneSearchError,
  geneSearchInput,
  geneSymbol,
  geneSuggestions,
  isGeneSearchInProgress,
  isInputFetchInProgress,
  inputFetchPayload,
  handleGeneSearchInputChange,
  handleGeneSuggestionsFetch,
  handleGeneSuggestionsClear,
  geneSearchFailure,
  fetchGeneData,
  fetchAnalysisInput,
}) {
  const [imgError, setImgError] = useState(false);

  // Genes available in this preliminary version is based of
  // longterm_muscle genes (more than the other 3 experiments)
  function handleGeneSearchSubmission(queryString) {
    if (MetaAnalysisGenes.indexOf(queryString.toUpperCase()) > -1) {
      const match = summaryStats.longterm_muscle.find((item) => item.Symbol === queryString.toUpperCase());
      fetchGeneData(match.Symbol, match.EntrezID);
      fetchAnalysisInput(match.Symbol);
    } else {
      return geneSearchFailure('No matching gene was found.');
    }
  }

  // Return the gene stat object for a given experiment
  // e.g. acute_muscle, longterm_muscle
  function getSummaryStat(tissue) {
    const geneStat = summaryStats[tissue].find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );

    return geneStat;
  }

  // Renders found gene stats info in the gene search panel
  function renderSummaryStat(tissue) {
    const geneStat = getSummaryStat(tissue);
    if (geneStat && Object.keys(geneStat).length) {
      return (
        <div className="table-responsive summary-stat-container mb-3">
          <table className="table table-sm">
            <thead className="thead-dark">
              <tr className="table-head">
                {Object.entries(geneStat).map(([key, value]) => {
                  return (
                    <th scope="col" key={`${tissue}-${key}-${value}`}>{`${key}`}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(geneStat).map(([key, value]) => {
                  return (
                    <td key={`${tissue}-${value}-${key}`}>{!Number.isNaN(roundNumbers(value, 2)) ? roundNumbers(value, 2) : value}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="gene-stat-container mb-3">
        No summary stats available.
      </div>
    )
  }

  // Renders column head of gene meta-analysis input table
  const renderMetaAnalysisTableHead = ({ tissue }) => {
    const tableHeads = [
      'Cohort ID',
      'Geo ID',
      'Training',
      'Avg Age',
      'Age SD',
      '%Males',
      'Time',
      'Sample Size',
      'Beta',
      'SDD',
    ];
    return (
      <tr className="table-head">
        {tableHeads.map((item) => {
          return (
            <th
              scope="col"
              key={`${tissue}-${item}`}
              className="gene-meta-analysis-label text-nowrap"
            >
              {`${item}`}
            </th>
          );
        })}
      </tr>
    );
  };

  // Renders individual rows of gene meta-analysis input table
  const renderMetaAnalysisTableRows = (data) => {
    const rows = data.map(item => (
      <tr key={item.sdd} className={`${item.avg_age} ${item.age_sd} ${item.sdd}`}>
        <td className="gene-meta-analysis-value text-nowrap">{item.V1}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.gse}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.training}</td>
        <td className="gene-meta-analysis-value text-nowrap">{roundNumbers(item.avg_age, 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{roundNumbers(item.age_sd, 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{roundNumbers(item.prop_males*100, 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.time}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.N}</td>
        <td className="gene-meta-analysis-value text-nowrap">{roundNumbers(item.yi, 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{roundNumbers(item.sdd, 2)}</td>
      </tr>
    ));

    return rows;
  };

  // Renders meta-analysis input table of a given experiment
  function renderAnalysisInput(tissue) {
    if (inputFetchPayload && inputFetchPayload[tissue] && inputFetchPayload[tissue].data) {
      return (
        <div className="analysis-input-container">
          <div className="table-responsive analysis-input-table-wrapper">
            <table className="table table-sm table-striped analysisInputTable">
              <thead className="thead-dark">
                {renderMetaAnalysisTableHead(tissue)}
              </thead>
              <tbody>{renderMetaAnalysisTableRows(inputFetchPayload[tissue].data)}</tbody>
            </table>
          </div>
          <div className="note-comment d-flex align-items-center">
            <span className="material-icons">info</span>
            <span>
              A cohort can have more than a single data point in a time window.
            </span>
          </div>
        </div>
      );
    }

    return null;
  }

  // Renders the plot given the presence of the analysis input table
  // for a particular experiment
  function renderForestPlot(tissue) {
    if (inputFetchPayload && inputFetchPayload[tissue] && inputFetchPayload[tissue].data) {
      const plot = `https://cdn-data-assets.extrameta.org/plots/${tissue}/${geneSymbol.toUpperCase()}.png`;

      return (
        <div className="plot-container">
          <div className={`plot-image-wrapper px-4 py-4 mt-4 mb-3${imgError ? ' hidden' : ''}`}>
            <img className="img-fluid plot-image" src={plot} alt={geneSymbol.toUpperCase()}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '1-pixel.gif';
                setImgError(true);
              }}
            />
          </div>
          <ul className={`plot-notes-wrapper mx-0 mb-1 px-1 list-unstyled${imgError ? ' hidden' : ''}`}>
            <li className="plot-notes-item text-muted">
              <span>
                * I^2 between 50% and 75% is considered to represent medium-high effect heterogeneity, p-values may be inaccurate.
              </span>
            </li>
            <li className="plot-notes-item text-muted">
              <span>
                ** I^2 &gt; 75% is considered as to be high effect heterogeneity, p-values are likely to be inaccurate.
              </span>
            </li>
          </ul>
        </div>
      );
    }
    
    return null;
  }

  // Renders recent user searched gene symbols if no error
  // otherwise, render error message
  function renderSavedSearches() {
    if (geneSearchError && geneSearchError.length) {
      return (
        <div className="search-error-message ml-3">
          {geneSearchError}
        </div>
      );
    }

    if (!geneSearchError && savedGeneSearches.length) {
      return (
        <div className="recent-search-terms ml-3">
          <span className="recent-search-terms-label text-muted mr-2">
            Recent searches:
          </span>
          {savedGeneSearches.map((item) => {
            return (
              <button
                type="button"
                key={item}
                className="btn btn-success btn-sm saved-search mr-2 rounded-pill"
                onClick={(e) => {
                  e.preventDefault();
                  handleGeneSearchSubmission(item);
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  }

  // Renders gene name and summary
  function renderGeneDefinition() {
    if (geneSearchPayload && Object.keys(geneSearchPayload).length) {
      return (
        <dl className="gene-definition-container">
          <dt>Name:</dt>
          <dd>{geneSearchPayload.name}</dd>
          <dt>Summary:</dt>
          <dd>{geneSearchPayload.summary ? geneSearchPayload.summary : 'Summary was not found.'}</dd>
        </dl>
      );
    }

    return null;
  }

  // Renders the gene stats table, analysis input table,
  // and forest plot for a given experiment
  function renderTissueAnalysis(tissue) {
    return (
      <div className="stat-plot-input-wrapper">
        {renderSummaryStat(tissue)}
        {renderAnalysisInput(tissue)}
        {renderForestPlot(tissue)}
      </div>
    );
  }

  // Renders all 4 analyses in tab UIs
  function renderResult() {
    if (
      !isGeneSearchInProgress &&
      !isInputFetchInProgress &&
      !geneSearchError &&
      geneSearchPayload &&
      Object.keys(geneSearchPayload).length
    ) {
      return (
        <div className="meta-analysis-data-container container">
          <div className="row">
            <h2 className="font-weight-bolder border-bottom py-2 w-100">{geneSymbol.toUpperCase()}</h2>
            {renderGeneDefinition()}
            <div className="card shadow-sm mb-4 w-100">
              <div className="card-body">
                {/* nav tabs */}
                <ul className="nav nav-pills" id="dataTab" role="tablist">
                  <li className="nav-item font-weight-bold" role="presentation">
                    <a className="nav-link active" id="acute_blood_tab" data-toggle="pill" href="#acute_blood" role="tab" aria-controls="acute_blood" aria-selected="true">Acute Blood</a>
                  </li>
                  <li className="nav-item font-weight-bold" role="presentation">
                    <a className="nav-link" id="acute_muscle_tab" data-toggle="pill" href="#acute_muscle" role="tab" aria-controls="acute_muscle" aria-selected="false">Acute Muscle</a>
                  </li>
                  <li className="nav-item font-weight-bold" role="presentation">
                    <a className="nav-link" id="longterm_blood_tab" data-toggle="pill" href="#longterm_blood" role="tab" aria-controls="longterm_blood" aria-selected="false">Longterm Blood</a>
                  </li>
                  <li className="nav-item font-weight-bold" role="presentation">
                    <a className="nav-link" id="longterm_muscle_tab" data-toggle="pill" href="#longterm_muscle" role="tab" aria-controls="longterm_muscle" aria-selected="false">Longterm Muscle</a>
                  </li>
                </ul>
                {/* tab panes */}
                <div className="tab-content mt-4">
                  <div className="tab-pane fade show active" id="acute_blood" role="tabpanel" aria-labelledby="acute_blood_tab">
                    {renderTissueAnalysis('acute_blood')}
                  </div>
                  <div className="tab-pane fade" id="acute_muscle" role="tabpanel" aria-labelledby="acute_muscle_tab">
                    {renderTissueAnalysis('acute_muscle')}
                  </div>
                  <div className="tab-pane fade" id="longterm_blood" role="tabpanel" aria-labelledby="longterm_blood_tab">
                    {renderTissueAnalysis('longterm_blood')}
                  </div>
                  <div className="tab-pane fade" id="longterm_muscle" role="tabpanel" aria-labelledby="longterm_muscle_tab">
                    {renderTissueAnalysis('longterm_muscle')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  // Start:: implementation of auto suggestions of genes
  const onChange = (event, { newValue, method }) => {
    handleGeneSearchInputChange(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value, MetaAnalysisGenes);
    handleGeneSuggestionsFetch(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    handleGeneSuggestionsClear();
  };

  const inputProps = {
    placeholder: 'Search a gene for analysis',
    value: geneSearchInput,
    onChange: onChange,
  };
  // End:: implementation of auto suggestions of genes

  return (
    <div className="analysis-page-container">
      {/* header section */}
      {!savedGeneSearches.length && (
        <section className="page-section">
          <div className="container">
            <div className="row text-left">
              <h2 className="section-heading">Meta-analysis of published exercise transcriptome data from human muscle and blood</h2>
              <p className="text-muted">
                This meta-analysis has been conducted on public transcriptome data from 1,724 samples. The analysis includes two sub-analyses: a meta-analysis of all cohorts and a gene-based time course clustering. The results are separated into "Acute Blood", "Acute Muscle", "Longterm Blood" and "Longterm Muscle", where acute means a single bout of endurance or resistance exercise.
              </p>
            </div>
            <PublicationBanner />
          </div>
        </section>
      )}
      {/* main content section */}
      <div className="meta-analysis-content-container mt-3">
        {/* gene search */}
        <div className="gene-search-container container px-0 mb-3">
          <div className="gene-search-content px-3 py-3 rounded-lg">
            <form
              id="metaAnalysisGeneSearchForm"
              name="metaAnalysisGeneSearchForm"
              className="form-inline"
              onSubmit={(e) => {
                e.preventDefault();
                handleGeneSearchSubmission(geneSearchInput);
              }}
            >
              <div className="input-group ml-2">
                {/*
                <input
                  type="text"
                  className="form-control"
                  id="geneSymbolSearchInput"
                  value={geneSearchInput}
                  placeholder="Search a gene for analysis"
                  aria-label="Search a gene for analysis"
                  aria-describedby="gene-search-btn"
                  onChange={(e) => {
                    e.preventDefault();
                    handleGeneSearchInputChange(e);
                  }}
                />
                */}
                <Autosuggest
                  suggestions={geneSuggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    id="gene-search-btn"
                    className="btn btn-dark submit-gene-search"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGeneSearchSubmission(geneSearchInput);
                    }}
                  >
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </div>
              {renderSavedSearches()}
            </form>
          </div>
        </div>
        {/* meta-analysis data container */}
        {(isGeneSearchInProgress || isInputFetchInProgress) && (
          <ProgressIndicator />
        )}
        {renderResult()}
      </div>
    </div>
  );
}

Analysis.propTypes = {
  savedGeneSearches: PropTypes.arrayOf(PropTypes.string),
  geneSearchPayload: PropTypes.shape({
    data: PropTypes.object,
  }),
  geneSearchError: PropTypes.string,
  geneSearchInput: PropTypes.string,
  geneSymbol: PropTypes.string,
  geneSuggestions: PropTypes.arrayOf(PropTypes.string),
  isGeneSearchInProgress: PropTypes.bool,
  isInputFetchInProgress: PropTypes.bool,
  inputFetchPayload: PropTypes.shape({
    data: PropTypes.object,
  }),
  handleGeneSearchInputChange: PropTypes.func.isRequired,
  handleGeneSuggestionsFetch: PropTypes.func.isRequired,
  handleGeneSuggestionsClear: PropTypes.func.isRequired,
  geneSearchFailure: PropTypes.func.isRequired,
  fetchGeneData: PropTypes.func.isRequired,
  fetchAnalysisInput: PropTypes.func.isRequired,
};

Analysis.defaultProps = {
  savedGeneSearches: [],
  geneSearchPayload: {},
  geneSearchError: null,
  geneSearchInput: '',
  geneSymbol: '',
  geneSuggestions: [],
  isGeneSearchInProgress: false,
  isInputFetchInProgress: false,
  inputFetchPayload: {},
};

const mapStateToProps = (state) => ({
  ...state.analysis,
});

const mapDispatchToProps = (dispatch) => ({
  handleGeneSearchInputChange: (geneInputValue) =>
    dispatch(AnalysisActions.geneSearchInputChange(geneInputValue)),
  handleGeneSuggestionsFetch: (suggestions) =>
    dispatch(AnalysisActions.geneSuggestionsFetch(suggestions)),
  handleGeneSuggestionsClear: () =>
    dispatch(AnalysisActions.geneSuggestionsClear()),
  geneSearchFailure: (geneSearchError) =>
    dispatch(AnalysisActions.geneSearchFailure(geneSearchError)),
  fetchGeneData: (geneSymbol, geneId) =>
    dispatch(AnalysisActions.fetchGeneData(geneSymbol, geneId)),
  fetchAnalysisInput: (geneSymbol) =>
    dispatch(AnalysisActions.fetchAnalysisInput(geneSymbol)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
