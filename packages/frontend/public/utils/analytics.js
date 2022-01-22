import {
  postData
} from './api.js';

/**
 * @param {import('~/t').AnalyticsEvent} eventData
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
    postData(`analytics/event`, {
      event: payload
    });

    return true;
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
