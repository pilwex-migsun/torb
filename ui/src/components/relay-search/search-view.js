import { Anchor, Box, Button, Col, ManagedCheckboxField, ManagedForm, ManagedRadioButtonField, ManagedTextInputField, Row, Text } from '@tlon/indigo-react';
import React, { Component } from 'react';
import { Formik } from 'formik';
//import { color } from 'styled-system';



function SearchForm(props) {
  return (
    <Formik
      initialValues={
        {
          topRelays: false,
          entireNetwork: false,
          detailsFor: false,
          simpleQuery: '',
          nickname: '',
          params: {
            host_name: '',
            first_seen_days : '',
            last_seen_days: '',
            version: '',
            type: '',
            as_name: '',
            running: null,
            lookup: '',
            flag: '',
            contact: '',
            country: '',
          },
          aggregateS: false,
          aggregateA: false,
          aggregateBy: false,
        }
      }
      onSubmit={(values)=>{props.handleSubmit(values); }}
      setFieldValue
    >
      {({ setFieldValue }) => (
        <ManagedForm>
          <Col id="simpleField" maxWidth="700px" gapY="2">
            <Text fontWeight="bold" > Simple Search</Text>
            <Text
              className="bg-gray5 br2 pa4"
              fontFamily="baskerville"
              fontSize="small"
              mt="4"
              mb="4"
              lineHeight="1.5"
            >
              Your query string can contain (partial) nicknames, IP addresses and fingerprints.
               You can also include parameters from the advanced form in your query string in the form of parameter:value. 
              For example, country:us will search for results from United States.<br/><br/>

              Top Relay renders top 250 running relays ordered by their consensus weight.<br/><br/>

              Aggregate Entire Network gives an overview of the all running relays.
              </Text>
              
            <Col
              gapY={2}
            >
              <ManagedTextInputField label="Query" id="simpleQuery" />
              <ManagedCheckboxField
                bold
                label="Aggregate results"
                disabled={true}
                hidden={true}
                id="aggregateS"
                maxWidth="px"
              />
              <Button type="submit" id="simpleSearchButton" fontSize="80%">
                Search
              </Button>
              <Row
                display="grid"
                gridTemplateColumns="1fr 1fr"
              >
                <Button
                  type="submit"
                  id="entireNetworkButton"
                  onClick={(e) => setFieldValue('entireNetwork', true, false)}
                  disabled={true}
                  fontSize="80%"
                  mr="1"
                >
                  Aggregate Entire Network
                </Button>
                <Button
                  type="submit"
                  id="topRelaysButton"
                  onClick={(e) => setFieldValue('topRelays', true, false)}
                  fontSize="80%"
                >
                  Top Relays
                </Button>
              </Row>
            </Col>
          </Col>
  
          <Col id="advancedField" maxWidth="700px" gapY="2" mt="4">
            <Text fontWeight="bold"> Advanced Search</Text>
            <Text
              className="bg-gray5 br2 pa4"
              fontFamily="baskerville"
              fontSize="small"
              mt="4"
              mb="4"
            >
              "The advanced search tool allows you to build advanced queries to search for data about single relays and bridges in the
               Tor network or aggregated data about currently running relays. For single relays, it provides useful information on how
                relays are configured along with graphs about their past. Aggregated data provides insight into diversity in the network
                 and the probabilities of using relays in a particular country or AS as a guard, middle or exit relay filtered by the search parameters."<br/><br/>
              If a search contains parameters not defined for bridges or relays, it will naturally not include any results.
              Fingerprints in requests sent to onionoo are hashed with sha1.
            </Text>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gridTemplateRows="8"
            >
              
              <ManagedTextInputField label="Nickname" id="nickname" mt="1" mr="1" />
              <ManagedTextInputField label="Hostname" id="params.host_name" mt="1" />
              <ManagedTextInputField label="First Seen" disabled={true} id="params.first_seen_days" mt="1" mr="1" />
              <ManagedTextInputField label="Last Seen" disabled={true} id="params.last_seen_days" mt="1" />
              <ManagedTextInputField label="Version" id="params.version" mt="1" mr="1" />
              <ManagedTextInputField label="Type" id="params.type" mt="1" />
              <ManagedTextInputField label="Autonomous System" id="params.as_name" mt="1" mr="1" />
              <ManagedTextInputField label="Running" id="params.running" mt="1" />
              <ManagedTextInputField label="Fingerprint" id="params.lookup" mt="1" mr="1" />
              <ManagedTextInputField label="Flag" id="params.flag" mt="1" />
              <ManagedTextInputField label="Contact" id="params.contact" mt="1" mr="1"/>
              <ManagedTextInputField label="Country" id="params.country" mt="1" />
              <Row gridColumn="1/3" mt="4">
                <ManagedCheckboxField label="Aggregate results:" id="aggregateA" pr="4" disabled={true} hidden={true}/>
                <ManagedRadioButtonField name="aggregateBy" disabled={true} hidden={true} label="default" id="Default" maxWidth="140px" mr="3" />
                <ManagedRadioButtonField name="aggregateBy" disabled={true} hidden={true} label="AS" id="AS" maxWidth="140px" mr="3" />
                <ManagedRadioButtonField name="aggregateBy" disabled={true} hidden={true} label="CC" id="CC" maxWidth="140px" mr="3" />
                <ManagedRadioButtonField name="aggregateBy" disabled={true} hidden={true} label="AS+CC" id="AS+CC" maxWidth="140px" mr="3" />
                <ManagedRadioButtonField name="aggregateBy" disabled={true} hidden={true} label="Version" id="Version" maxWidth="140px" mr="3" />
              </Row>
              <Button type="submit" id="advancedSearchButton" gridColumn="1/3" fontSize="80%" mt="2">
                  Search
              </Button>
            </Box>
          </Col>
        </ManagedForm>
      )}
    </Formik>
  );

}


// implement this function using refs to make radiobuttons dependent on aggregate by checkbox
/*
const enableAggregationBy = ()=>{
  null;
};
enableAggregationBy();
*/

export default class SearchView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <Col
                className="items-center"
                position="relative"
                gapY="4"
              >
                <Text
                  fontWeight="bold"
                  fontSize={2}
                  color="purple"
                >
                  Relay Search
                </Text>
                <Text
                  maxWidth="700px"
                  fontFamily="baskerville"
                  lineHeight="1.5"
                >
                  This service queries Onionoo protocol to retrieve information about Tor relays and brdiges.<br />
                  Search for any term in the simple form or retrive top relays. The advanced form let's you narrow down your search 
                  base on parameters available for each node.
                  <Anchor
                    target='_blank'
                    style={{ textDecoration: 'none' }}
                    borderBottom={1}
                    ml={1}
                    fontSize="80%"
                    href='https://metrics.torproject.org/onionoo.html'
                  > 
                    Learn More
                    </Anchor>
                  </Text>
                  <Text
                    hidden={true}
                    maxWidth="700px"
                    fontFamily="baskerville"
                  >
                    <br/>
                    "The aggregated search tool displays aggregated data about relays in the Tor network. It provides insight into diversity
                     in the network and the probabilities of using relays in a particular country or AS as a guard, middle or exit relay.
                      The results are restricted to only currently running relays and do not include bridge data."<br/>
                    Aggregation retrives running relays based on search parameters, and aggregates the results in a table.
                     The parameters include consensus weight, advertised bandwidth, guard probability, middle probability, exit probability,
                      number of relays, number of guards, and number of exits.
                  </Text>
                <SearchForm handleSubmit={this.props.handleSubmit}/>
              </Col>
        )
    }
}


/*
<Text hidden={true} className="bg-gray5 br2 pa4" fontFamily="baskerville" fontSize="small" mt="4" mb="4" lineHeight="1.5">
              To search for a specific bridge, you need know its hashed fingerprint.
               It is stored in the hashed-fingerprint file specified  as DataDirectory in torrc in tor directory.<br/><br/>
              </Text>
              */