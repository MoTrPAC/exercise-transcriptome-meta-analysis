import React, { useEffect } from 'react';
import gtag from 'ga-gtag';

const trackingId = () => {
  // available measurement Ids for ExtraMeta apps
  const trackers = {
    'extrameta.org': 'G-WBEJ3PWCRP',
    'test.extra-meta.org': 'G-9HQB2G0WNQ',
  };

  //  determine current hostname
  let analyticsTrackerHostname = document.location.hostname;

  // match hostname to google analytics domain identified for tracker
  if (/^(www\.)?extrameta\.org\//.test(analyticsTrackerHostname)) {
    // production app
    analyticsTrackerHostname = 'extrameta.org';
  } else if (/^test\.extra-meta\.org\//.test(analyticsTrackerHostname)) {
    // test app
    analyticsTrackerHostname = 'test.extra-meta.org';
  } else {
    // catch-all
    analyticsTrackerHostname = 'test.extra-meta.org';
  }

  // use correct tracking Id based on hostname
  const tracker = trackers[analyticsTrackerHostname];

  return tracker;
};

export const withTracker = (WrappedComponent) => {
  const trackPage = (page) => {
    gtag('config', trackingId(), {'page_path': page, 'site_speed_sample_rate' : 100});
  };

  const HOC = (props) => {
    const { location } = props;
    useEffect(() => trackPage(location.pathname), [
      location.pathname,
    ]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default trackingId;
