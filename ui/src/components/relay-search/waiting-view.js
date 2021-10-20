// This component takes json data containg the results and renders them into a talbe.
// Does not have any state.
// Some of the table cells are links that retrieve more detailed results.
// The processing of the response to the queries happens on the ship.

import React, { Component } from "react";
import { Button, Col, LoadingSpinner, Row, Text } from '@tlon/indigo-react';

export default class WaitingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return(
        <Col  gapY="8" >
          <Row display="grid" gridTemplateColumns="4fr 1fr">
            <Text
              fontWeight="bold"
              fontSize={2}
              color="purple"
              align-self="flex-start"
            >
              Relay Search
            </Text>
            <Button
              onClick={this.props.newSearch}
              fontSize="70%"
            >
              New Search
            </Button>
          </Row>
          <Col gapY="2" alignItems="center">
          <LoadingSpinner/>
          {!this.props.entireNetwork
            ? <Text fontSize="0.875rem">waiting for results...</Text>
            : <><Text fontSize="0.875rem">waiting for results...</Text><Text fontSize="0.875rem">This will take a while. Your ship would be busy during this time.</Text></>
          }
          </Col>
        </Col>
      )
    }
}
