import React from 'react';

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
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
