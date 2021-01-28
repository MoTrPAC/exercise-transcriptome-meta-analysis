import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AnalysisActions from './analysisActions';
import MetaAnalysisGenes, { summaryStats, metaAnalysisInput, metaAnalysisPlots } from '../../data/metaAnalysis';
import iconLoading from '../../assets/icons/sync.png';

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
  isGeneSearchInProgress,
  handleGeneSearchInputChange,
  geneSearchFailure,
  fetchGeneData,
}) {
  // Only a limited number of genes available in preliminary version
  function handleGeneSearchSubmission(queryString) {
    if (MetaAnalysisGenes.indexOf(queryString.toUpperCase()) > -1) {
      const match = summaryStats.acute_muscle.find((item) => item.Symbol === queryString.toUpperCase());
      fetchGeneData(match.Symbol, match.EntrezID);
    } else {
      return geneSearchFailure('No matching gene was found.');
    }
  }
  /**
   * Utility function - simple Math.round method
   * alternative #1 - Math.round(num * 10) / 10; //*** returns 1 decimal
   * alternative #2 - Math.round((num + 0.00001) * 100) / 100; //*** returns 2 decimals
   */
  const classificationMathRound = (number, decimals) => {
    return Number(Math.round(number + ('e' + decimals)) + ('e-' + decimals));
  };

  function getSummaryStat(tissue) {
    let geneStat;
    if (tissue === 'acute_blood') {
      geneStat = summaryStats.acute_blood.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    } else if (tissue === 'acute_muscle') {
      geneStat = summaryStats.acute_muscle.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    } else if (tissue === 'longterm_blood') {
      geneStat = summaryStats.longterm_blood.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    } else if (tissue === 'longterm_muscle') {
      geneStat = summaryStats.longterm_muscle.find(
        (item) => item.Symbol === geneSymbol.toUpperCase()
      );
    }

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
                    <th scope="col" key={value}>{`${key}`}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(geneStat).map(([key, value]) => {
                  return (
                    <td key={key}>{!Number.isNaN(classificationMathRound(Number(value), 2)) ? classificationMathRound(Number(value), 2) : value}</td>
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

  function getAnalysisInput(tissue) {
    let analysisInput;
    if (tissue === 'acute_blood') {
      analysisInput = metaAnalysisInput.acute_blood.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'acute_muscle') {
      analysisInput = metaAnalysisInput.acute_muscle.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'longterm_blood') {
      analysisInput = metaAnalysisInput.longterm_blood.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'longterm_muscle') {
      analysisInput = metaAnalysisInput.longterm_muscle.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    }

    return analysisInput;
  }

  // Renders table head of gene meta-analysis
  const renderMetaAnalysisTableHead = () => {
    return (
      <tr className="table-head">
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Cohort ID</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Geo ID</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Training</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Avg Age</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">Age SD</th>
        <th scope="col" className="gene-meta-analysis-label text-nowrap">SDD</th>
      </tr>
    );
  };

  // Renders individual rows of gene meta-analysis data
  const renderMetaAnalysisTableRows = (data) => {
    const rows = data.map(item => (
      <tr key={item.sdd} className={`${item.avg_age} ${item.age_sd} ${item.sdd}`}>
        <td className="gene-meta-analysis-value text-nowrap">{item.V1}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.gse}</td>
        <td className="gene-meta-analysis-value text-nowrap">{item.training}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.avg_age), 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.age_sd), 2)}</td>
        <td className="gene-meta-analysis-value text-nowrap">{classificationMathRound(Number(item.sdd), 2)}</td>
      </tr>
    ));

    return rows;
  };

  // Renders meta-analysis of a gene for acute muscle
  function renderAnalysisInput(tissue) {
    const analysisInput = getAnalysisInput(tissue);
    if (analysisInput && analysisInput.inputSource && analysisInput.inputSource.length) {
      return (
        <div className="analysis-input-container">
          <div className="table-responsive analysis-input-table-wrapper">
            <table className="table table-sm table-striped analysisInputTable">
              <thead className="thead-dark">
                {renderMetaAnalysisTableHead()}
              </thead>
              <tbody>{renderMetaAnalysisTableRows(analysisInput.inputSource)}</tbody>
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

  function renderForestPlot(tissue) {
    let plot;
    if (tissue === 'acute_blood') {
      plot = metaAnalysisPlots.acute_blood.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'acute_muscle') {
      plot = metaAnalysisPlots.acute_muscle.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'longterm_blood') {
      plot = metaAnalysisPlots.longterm_blood.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    } else if (tissue === 'longterm_muscle') {
      plot = metaAnalysisPlots.longterm_muscle.find((item) => item.geneSymbol === geneSymbol.toUpperCase());
    }

    if (plot && plot.plotSource) {
      return (
        <div className="plot-container">
          <img className="img-fluid" src={plot.plotSource} alt={geneSymbol.toUpperCase()} />
        </div>
      );
    }
    
    return null;
  }

  // render recent user searched gene symbols if no error
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

  function renderGeneDefinition() {
    if (geneSearchPayload && Object.keys(geneSearchPayload).length) {
      return (
        <dl className="gene-definition-container">
          <dt>Name:</dt>
          <dd>{geneSearchPayload.name}</dd>
          <dt>Summary:</dt>
          <dd>{geneSearchPayload.summary}</dd>
        </dl>
      );
    }

    return null;
  }

  function renderTissueAnalysis(tissue) {
    return (
      <div className="stat-plot-input-wrapper">
        {renderSummaryStat(tissue)}
        {renderAnalysisInput(tissue)}
        {renderForestPlot(tissue)}
      </div>
    );
  }

  function renderResult() {
    if (
      !isGeneSearchInProgress &&
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

  return (
    <div className="analysis-page-container">
      {/* header section */}
      {!savedGeneSearches.length && (
        <section className="page-section">
          <div className="container">
            <div className="row text-left">
              <h2 className="section-heading">Human meta-analysis on published data</h2>
              <p className="text-muted">
                This analysis includes two sub-analyses: the meta-analysis of public data and the gene time course clustering. It displays up and down regulations. Gene lists are detected for interpretation.
              </p>
            </div>
          </div>
        </section>
      )}
      {/* main content section */}
      <div className="meta-analysis-content-container mt-3">
        <div className="alert-container container mb-3">
          <div className="row alert alert-warning alert-dismissible fade show warning-note d-flex align-items-center" role="alert">
            <span className="material-icons">info</span>
            <span className="warning-note-text">
              The dataset for analysis in the current release only include
              5 genes (FOXO1, ID1, PPARGC1A, SMAD3, VEGFA).
            </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
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
        {isGeneSearchInProgress && (
          <div className="meta-analysis-data-container container">
            <div className="row loading-ui">
              <img src={iconLoading} className="in-progress-spinner" alt="Request in progress" />
            </div>
          </div>
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
  isGeneSearchInProgress: PropTypes.bool,
  handleGeneSearchInputChange: PropTypes.func.isRequired,
  geneSearchFailure: PropTypes.func.isRequired,
  fetchGeneData: PropTypes.func.isRequired,
};

Analysis.defaultProps = {
  savedGeneSearches: [],
  geneSearchPayload: {},
  geneSearchError: null,
  geneSearchInput: '',
  geneSymbol: '',
  isGeneSearchInProgress: false,
};

const mapStateToProps = (state) => ({
  ...state.analysis,
});

const mapDispatchToProps = (dispatch) => ({
  handleGeneSearchInputChange: (e) =>
    dispatch(AnalysisActions.geneSearchInputChange(e)),
  geneSearchFailure: (geneSearchError) =>
    dispatch(AnalysisActions.geneSearchFailure(geneSearchError)),
  fetchGeneData: (geneSymbol, geneId) =>
    dispatch(AnalysisActions.fetchGeneData(geneSymbol, geneId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
