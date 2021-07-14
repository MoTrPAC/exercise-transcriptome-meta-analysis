import React from 'react';
import iconRocket from '../assets/icons/rocket.svg';
import AnimatedCloud from './animated-cloud';

/**
 * Banner UI displaying citation of published paper
 *
 * @returns JSX representation of banner UI
 */
function PublicationBanner() {
  return (
    <div className="banner-wrapper row mt-3 mb-0">
      <AnimatedCloud />
      <div className="banner-content px-4 py-4 text-white">
        <h4 className="banner-heading d-flex align-items-center mb-3">
          <span>Open access article  published</span>
          <img className="banner-heading-icon ml-1" src={iconRocket} alt="Launched!" />
        </h4>
        <span className="citation">
          Amar, D., Lindholm, M.E., Norrbom, J., Wheeler, M.T., Rivas, M.A., Ashley, E.A. Time trajectories in the
          transcriptomic response to exercise - a meta-analysis. <em>Nat Commun</em> 12, 3471 (2021).
          {' '}
          <a className="banner-link" href="https://doi.org/10.1038/s41467-021-23579-x" target="_blank" rel="noreferrer">
            https://doi.org/10.1038/s41467-021-23579-x
          </a>
        </span>
      </div>
    </div>
  );
}

export default PublicationBanner;
