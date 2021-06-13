import React from 'react';
import tableSupplData from '../../assets/files/Supplementary_data_1.xlsx';
import iconRocket from '../../assets/icons/rocket.svg';

function About() {
  return (
    <div className="about-page-container">
      {/* About the consortium */}
      <section className="page-section">
        <div className="container">
          <div className="row text-left">
            <h2 className="section-heading">About this site</h2>
            <p className="text-muted">
              This database comprises meta-analysis results from 43 publicly available exercise transcriptome datasets from human skeletal muscle and blood. The results are based on 1,724 samples from 739 individuals. The analysis is conducted using a linear mixed effects meta-regression model selection strategy and details on the methods and the results are presented in the publication (currently accepted for publication).
            </p>
            <p className="text-muted">
            In the generated forest plots, the rows represent the 95% confidence interval of a fold change of a cohort in a given time point. In each interval the center represents the fold change estimate and the error bars are proportional to the fold change standard error. Cohort: the ID given to the cohort in this study (please see
              {' '}
              <a href={tableSupplData} download>table</a>
              {' '}
              for details), N: sample size, Type: exercise type, endur for endurance and resist for resistance exercise, Age: mean age in cohort, %M: percent of males in cohort, Time: the time window in hours for acute and in days for longterm. Note that a cohort can have multiple rows with the same time window and different fold changes (e.g., if a study measured the transcription at both 2h and 4h then both time points will be assigned to the 2-5h window).
            </p>
          </div>
          <div className="banner-wrapper row mt-3 mb-0">
            <div className="animated-cloud-container h-100 w-100">
              <div class="x1">
                  <div class="cloud"></div>
              </div>
              <div class="x2">
                  <div class="cloud"></div>
              </div>
              <div class="x3">
                  <div class="cloud"></div>
              </div>
              <div class="x4">
                  <div class="cloud"></div>
              </div>
              <div class="x5">
                  <div class="cloud"></div>
              </div>
            </div>
            <div className="banner-content px-4 py-4 text-white">
              <h4 className="banner-heading d-flex align-items-center mb-3">
                <span>Open access article  published</span>
                <img className="banner-heading-icon ml-1" src={iconRocket} alt="Launched!" />
              </h4>
              <span>
                Amar, D., Lindholm, M.E., Norrbom, J. <em>et al.</em> Time trajectories in the
                transcriptomic response to exercise - a meta-analysis. <em>Nat Commun</em> 12, 3471 (2021).
                {' '}
                <a className="banner-link" href="https://doi.org/10.1038/s41467-021-23579-x" target="_blank" rel="noreferrer">
                  https://doi.org/10.1038/s41467-021-23579-x
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
