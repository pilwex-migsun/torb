export default class Subscription {
  constructor(store, api, channel) {
    this.store = store;
    this.api = api;
    this.channel = channel;
  }

  start() {
    if (this.api.ship) {
      this.initializeTorb();
    } else {
      console.error("~~~ ERROR: Must set api.ship before operation ~~~");
    }
  }

  // start up a subscription on the '/all' path
  // see on-watch for handling of subscription

  initializeTorb() {
    this.api.bind('/all', 'PUT', this.api.ship, 'torb',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }

  handleEvent(diff) {
    this.store.handleEvent(diff);
  }

  handleError(err) {
    console.error(err);
    api.bind('/all', 'PUT', api.api.ship, 'torb',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }
}

