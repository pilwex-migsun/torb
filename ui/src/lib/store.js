import { InitialReducer } from './reducers/initial';
import { UpdateReducer } from './reducers/update';

class Store {

  /*
  The store holds all state for the front-end. We initialise a subscription to the back-end through
  subscription.js and then let the store class handle all incoming diffs, including the initial one
  we get from subscribing to the back-end.

  It's important that state be mutated and set in one place, so pipe changes through the handleEvent method.
  */

    constructor() {
        this.state = {
          relaySearch: {
            results: {},
            url: '',
          },
        };

        this.initialReducer = new InitialReducer();
        this.updateReducer = new UpdateReducer();
        this.setState = () => { };
    }

    setStateHandler(setState) {
        this.setState = setState;
    }

    handleEvent(data) {

      /*
      The JSON we receive (here data in handleEvent(data)) on landscape:
       {
        data: null,
        from: {
          ship: zod,
          path: /all
        }
      }
      */
        
        this.initialReducer.reduce(data, this.state);
        this.updateReducer.reduce(data, this.state);
        this.setState(this.state);
        console.log('received data: ', data);
    }
}

export let store = new Store();
window.store = store;