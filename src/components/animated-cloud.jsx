import React from 'react';

/**
 * CSS-based infinite loop of animated clouds
 *
 * @returns JSX representation of DOM elements styled via CSS
 */
function AnimatedCloud() {
  return (
    <div className="animated-cloud-container h-100 w-100">
      <div className="x1">
          <div className="cloud"></div>
      </div>
      <div className="x2">
          <div className="cloud"></div>
      </div>
      <div className="x3">
          <div className="cloud"></div>
      </div>
      <div className="x4">
          <div className="cloud"></div>
      </div>
      <div className="x5">
          <div className="cloud"></div>
      </div>
    </div>
  );
}

export default AnimatedCloud;
