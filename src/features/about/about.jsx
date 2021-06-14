import React from 'react';
import tableSupplData from '../../assets/files/Supplementary_data_1.xlsx';
import PublicationBanner from '../../components/publication-banner';

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
          <PublicationBanner />
        </div>
      </section>
    </div>
  );
}

export default About;
