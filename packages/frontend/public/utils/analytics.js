import * as types from '~/types.js';

import {
  postData
} from './api.js';

/**
 * @param {types.AnalyticsEvent} eventData
 * @return {Promise<boolean>}
 */
async function fireEvent(eventData) {
  const eventReport = {
    ...eventData,
    eventLocation: window.location.href,
    eventTime: Date.now()
  };
  const payload = btoa(JSON.stringify(eventReport));

  try {
    postData(`analytics/event`, { event: payload });
  }
  catch (ex) {
    // TODO: dump into local storage and retry later
    return false;
  }
}

async function firePageView() {
  fireEvent({
    eventType: `pageview`
  });
}

export {
  fireEvent,
  firePageView
};
