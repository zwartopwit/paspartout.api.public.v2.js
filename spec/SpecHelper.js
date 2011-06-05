var apiData, apiError;

Paspartout.config.siteId = 'ppt-247400';

function apiToReturnData() {
  return typeof apiData === 'object' || typeof apiError === 'string';
};

function resetApiData() {
  apiData = undefined;
  apiError = undefined;
};