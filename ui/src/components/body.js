import React, { Component } from "react";
import { Box } from '@tlon/indigo-react';
import RelaySearch from "./relay-search/relay-search.js";


export default class Body extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Box
        p='4'
        borderWidth={['none', '1px']}
        flexGrow={1}
        borderStyle="solid"
        borderColor="washedGray"
      >
        <RelaySearch api={this.props.api} state={this.props.state.relaySearch}/>
      </Box>
      
    )
  }
}

