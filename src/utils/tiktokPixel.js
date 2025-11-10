// TikTok Pixel tracking helpers

export const TIKTOK_CONVERSION_TOKEN =
  "66c0c4b92d2603963dfd03d50f2b2ac531d7ecf6";

const callTikTok = (callback) => {
  if (typeof window === "undefined") return;
  const { ttq } = window;
  if (typeof ttq === "function") {
    callback(ttq);
  } else {
    console.warn("TikTok Pixel not initialized yet");
  }
};

export const trackTikTokPageView = (pageName = null) => {
  callTikTok((ttq) => {
    ttq.page();
    if (pageName) {
      ttq.track("Browse", { page_name: pageName });
    }
  });
};

export const trackTikTokEvent = (eventName, parameters = {}) => {
  callTikTok((ttq) => {
    ttq.track(eventName, parameters);
    console.log("TikTok event tracked", { eventName, parameters });
  });
};

export const trackTikTokLead = (parameters = {}) => {
  trackTikTokEvent("Lead", parameters);
};

export const trackTikTokCompleteRegistration = (parameters = {}) => {
  trackTikTokEvent("CompleteRegistration", parameters);
};

export const trackTikTokSubmitForm = (parameters = {}) => {
  trackTikTokEvent("SubmitForm", parameters);
};
