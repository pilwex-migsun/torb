
// This component is the top-most component in the search-relay directory.
// It holds the state, chooses the view, and handles form submition.
import React, { Component } from "react";
//import { Anchor, Box, Button, Col, cosmeticStyle, ManagedCheckboxField, ManagedForm, ManagedRadioButtonField, ManagedTextInputField, Row, Table, Text } from '@tlon/indigo-react';
import _ from "lodash";
import SearchView from "./search-view.js";
import WaitingView from "./waiting-view.js";
import ResultView from "./result-view.js";


function processSearchRequest(json) {
  if (json.topRelays) {
    return {
      'query-onionoo': {
        url: 'details?type=relay&order=-consensus_weight&limit=250&running=true',
      }
    }
  } else if (json.entireNetwork) {
    return {
      'query-onionoo': {
        url: 'details?running=true&type=relay&fields=country,guard_probability,middle_probability,exit_probability,consensus_weight,consensus_weight_fraction,advertised_bandwidth,flags,as,as_name,measured,version',
      }
    }
  } else if (json.detailsFor) {
    return {
      'query-onionoo': {
        url: 'details?lookup=' + json.lookup,
      }
    }
  } else if (json.simpleQuery) {
    return {
      'query-onionoo': {
        url: 'details?search=' + json.simpleQuery + '&limit=100'
      }
    }  
  } else {
    var paramsUrl = '';
    paramsUrl = json.nickname ? `${json.nickname}&` : '';
    for (const key in json.params) {
      if (json.params[key]) {
        paramsUrl += key + ':' + json.params[key] + '&'
        paramsUrl.toLowerCase();
      }
    };
    return {
      'query-onionoo': {
        url: 'details?search=' + paramsUrl + '&limit=100'
      }
    }  
  }
}

export default class RelaySearch extends Component {
  
  constructor(props) {
    super(props);
    // url is used to compare with the latest query and avoid repetetive searches
    this.state ={
      waiting: false,
      searchRequest: {},
      url: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.newSearch = this.newSearch.bind(this);
    }

    newSearch(e) {
      this.setState({waiting: false});
    };

    handleSubmit(searchRequest) {
      //console.log('search rquest is: ', searchRequest)
      const processed = processSearchRequest(searchRequest);
      if (processed['query-onionoo'].url == this.state.url) {
        this.setState({waiting: true});
      } else {
        this.state.searchRequest = searchRequest;
        this.state.url = _.get(processed, 'query-onionoo.url', '');
        this.setState({waiting: true});
        this.props.api.onionoo(processed);
      }
    };

    render() {
        if (this.state.waiting == false) {
          return (
            <SearchView
              api={this.props.api}
              handleSubmit={this.handleSubmit}
            />
          )
        } else if (this.props.state.url == this.state.url) {
          return (
            <ResultView
              results={this.props.state.results}
              url={this.props.state.url}
              searchRequest={this.state.searchRequest}
              newSearch={this.newSearch}
            />)        
        } else if (this.state.waiting == true) {
          return (
            <WaitingView
              newSearch={this.newSearch}
              entireNetwork={this.state.searchRequest.entireNetwork}
            />
          )
        }
    }
}