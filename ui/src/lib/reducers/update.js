import _ from 'lodash';


export class UpdateReducer {
  reduce(json, state) {
    let data = _.get(json, 'data', false)
    if (data) {
      state.relaySearch.results = data.response;
      state.relaySearch.url = data.url;
    }
  }
}
