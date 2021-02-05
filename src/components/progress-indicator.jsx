import React from 'react';
import iconLoading from '../assets/icons/sync.png';

/**
 * Render in-progress/loading icon
 */
function ProgressIndicator() {
  return (
    <div className="meta-analysis-data-container container">
      <div className="row loading-ui">
        <img src={iconLoading} className="in-progress-spinner" alt="Request in progress" />
      </div>
    </div>
  );
}

export default ProgressIndicator;
