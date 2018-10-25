import auth from 'solid-auth-client';

let webId;

const trackers = new Set();
auth.trackSession(session => {
  webId = session && session.webId;
  for (const tracker of trackers)
    tracker.webId = webId;
});

export default {
  track: tracker => {
    trackers.add(tracker);
    tracker.webId = webId;
  },
  untrack: tracker => {
    trackers.delete(tracker);
  }
};
