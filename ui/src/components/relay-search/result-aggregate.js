import React, { Component } from "react";
import { Anchor, Box, Button, Col, ManagedCheckboxField, ManagedForm, ManagedRadioButtonField, ManagedTextInputField, Row, Table, Text } from '@tlon/indigo-react';

export default class ResultView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

      const relays = this.props.results.relays;
      const bridges = this.props.results.bridges;
      const relaysPublished = this.props.results.relays_published;
      const bridgesPublished = this.props.results.bridges_published;

        return (
          <Col gapY="4">
            <Row>
              <Text fontWeight="bold">Relay Search</Text>
              <Button onClick={this.props.newSearch}>New Search</Button>
            </Row>
            <Text>Aggregate Results</Text>
          </Col>
        )
    }
}