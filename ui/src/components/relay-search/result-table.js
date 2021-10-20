// This component takes json data containg the results and renders them into a talbe.
// Does not have any state.
// Some of the table cells are links that retrieve more detailed results.

import { Box, Button, Col, Row, Table, Text } from '@tlon/indigo-react';
import React, { Component } from "react";

function convertMiliseconds(miliseconds) {
  let days, hours, totalMinutes;
  
  totalMinutes = parseInt(Math.floor((miliseconds / 60000)));
  
  days = parseInt(Math.floor(totalMinutes / 1440));
  hours = parseInt(Math.floor((totalMinutes / 60) % 24));
  if (days < 1) {
    return `${hours}h`
  } else {
    return `${days}d and ${hours}h`
  }
};

function parseIP(address, what) {

  // or_address:["IPv4:OR_Port", "[IPv6]:OR_Port"]
  switch (what) {
    case 'v6':
      if (!address[1]) {
        return '-';
      } else {
        //let address = address[1];
        //let i = address.lastIndexOf(':');
        //return address.slice(1,i-1);
        return address[1];
      }
    case 'v4':
      //let address = address[0];
      //let i = address.lastIndexOf(':');
      //return address.slice(0,i);
      return address[0];
    default:
      return null;
  }
}

function parseBandwidth(raw) {
  let bandwidth = (Math.floor((raw / 1048576) * 100) / 100)
  if (bandwidth < 1) {
    return `${bandwidth*1000} KB/S`
  } else {
    return `${bandwidth} MB/S`
  }
}

function parseFlags(flags) {
  let flagString = '';
  for (let f of flags) {
    flagString += ' ' + f;
  }
  return flagString
}

function MakeTable(props) {
  const relays = props.results.relays;
  const bridges = props.results.bridges;
  /*
  let bridgeRows = bridges.map(bridge => 
    <tr>
      <td>{relay.nickname}</td>
      <td>{Math.floor((relay.advertised_bandwidth / 1048576) * 100)/100} MiB/S</td>
      <td>{convertMiliseconds(Math.abs(new Date(relay.last_seen) - new Date(relay.last_restarted)))}</td>
      <td>{relay.country}</td>
      <td>ipv4</td>
      <td>ipv6</td>
      <td>{relay.flags}</td>
      <td>null</td>
      <td>null</td>
      <rd>Relay</rd>
    </tr>
  )
*/
  let relayRows = relays.map(relay => 
    <tr className="striped--light-gray">
      <td className="f8 tc pa2 bb">{relay.nickname}</td>
      <td className="f8 tc pa2 bb">{parseBandwidth(relay.advertised_bandwidth)}</td>
      <td className="f8 tc pa2 bb">{convertMiliseconds(Math.abs(new Date(relay.last_seen) - new Date(relay.last_restarted)))}</td>
      <td className="f8 tc pa2 bb">{relay.country}</td>
      <td className="f8 tc pa2 bb">{parseFlags(relay.flags)}</td>
      <td className="f8 tc pa2 bb">Relay</td>
      <td className="f8 tc pa2 bb">{parseIP(relay.or_addresses, 'v4')}</td>
      <td className="f8 tc pa2 bb">{parseIP(relay.or_addresses, 'v6')}</td>
    </tr>
  )
  return(
    <Table className="br w-100">
      <thead> 
        <tr>
          <th className="f8 pa2 bb">Nickname</th>
          <th className="f8 pa2 bb">Adv. Bandwidth</th>
          <th className="f8 pa2 bb">Uptime</th>
          <th className="f8 pa2 bb">Country</th>
          <th className="f8 pa2 bb">Flags</th>
          <th className="f8 pa2 bb">Type</th>
          <th className="f8 pa2 bb">IPv4</th>
          <th className="f8 pa2 bb">IPv6</th>
        </tr>
      </thead>
      <tbody className="bb">
        {relayRows}
      </tbody>
    </Table>
  );
};

export default class ResultTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {

      const relays = this.props.results.relays;
      const bridges = this.props.results.bridges;
      const relaysPublished = this.props.results.relays_published;
      const bridgesPublished = this.props.results.bridges_published;
      const version = this.props.results.version;
      const url = this.props.url;
      console.log(this.props.results)

      return (
        <Col className="items-center" gapY="4" >
          <Row
            className="w-100"
            display="grid"
            gridTemplateColumns="4fr 1fr"
          >
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
          <Col gapY="3">
            <Text className="self-start" fontSize="0.75rem">
              Search results for {url}<br/>
            </Text>
            <Text className="self-start" fontSize="0.5rem">  
              Only the top 100 results are shown.
            </Text>
            <Box className="overflow-x-auto" > 
              <MakeTable results={this.props.results}/>
            </Box>
            <Text
              className="self-start"
              fontSize="0.75rem"
              maxWidth="50%"
            >
            Relays last published: {relaysPublished} UTC.<br />
            Bridges last published: {bridgesPublished} UTC.<br />
            Onionoo version: {version}
            </Text>
          </Col>
        </Col>    
      )
    }
  }









  /*
results:{
  bridges: Array(0)
  bridges_published: "2021-10-09 12:50:40"
  build_revision: "06113f2"
  relays: Array(1)
  relays_published: "2021-10-09 13:00:00"
  version: "8.0"
}

{"version":"8.0",
"build_revision":"06113f2",
"relays_published":"2021-10-09 14:00:00",
"relays":[
{"nickname":"moria1",
"fingerprint":"9695DFC35FFEB861329B9F1AB04C46397020CE31",
"or_addresses":["128.31.0.34:9101"],
"dir_address":"128.31.0.34:9131",
"last_seen":"2021-10-09 14:00:00",
"last_changed_address_or_port":"2010-01-18 23:00:00",
"first_seen":"2010-01-18 23:00:00",
"running":true,
"flags":["Authority","Running","Stable","V2Dir","Valid"],
"country":"us",
"country_name":"United States of America",
"as":"AS3",
"consensus_weight":43,
"verified_host_names":["moria.csail.mit.edu"],
"last_restarted":"2021-09-12 12:38:33",
"bandwidth_rate":40960,
"bandwidth_burst":104857600,
"observed_bandwidth":3046164,
"advertised_bandwidth":40960,
"exit_policy":["reject *:*"],
"exit_policy_summary":{"reject":["1-65535"]},
"contact":"1024D/EB5A896A28988BF5 arma mit edu",
"platform":"Tor 0.4.6.0-alpha-dev on Linux",
"version":"0.4.6.0-alpha-dev",
"version_status":"unrecommended",
"effective_family":["9695DFC35FFEB861329B9F1AB04C46397020CE31"],
"consensus_weight_fraction":3.4711226E-7,
"guard_probability":0.0,
"middle_probability":1.034857E-6,
"exit_probability":0.0,
"recommended_version":false,
"measured":true,
"unreachable_or_addresses":["[::]:9101"]},
{"nickname":"csailmitnoexit","fingerprint":"9715C81BA8C5B0C698882035F75C67D6D643DBE3","or_addresses":["128.31.0.61:443"],"dir_address":"128.31.0.61:80","last_seen":"2021-10-09 14:00:00","last_changed_address_or_port":"2017-10-13 16:00:00","first_seen":"2013-09-28 20:00:00","running":true,"flags":["Fast","Guard","Running","Stable","V2Dir","Valid"],"country":"us","country_name":"United States of America","as":"AS3","consensus_weight":46000,"verified_host_names":["tor-noexit.csail.mit.edu"],"last_restarted":"2021-09-30 17:30:31","bandwidth_rate":104857600,"bandwidth_burst":314572800,"observed_bandwidth":54858499,"advertised_bandwidth":54858499,"exit_policy":["reject *:*"],"exit_policy_summary":{"reject":["1-65535"]},"contact":"Jon Proulx <jon AT csail dot mit dot edu> GPG Key ID 0x37C6224D225BCD7D Finger Print: 4829 BCDD 4A4D 1902 857B  3A16 37C6 224D 225B CD7D","platform":"Tor 0.4.5.7 on Linux","version":"0.4.5.7","version_status":"recommended","effective_family":["9715C81BA8C5B0C698882035F75C67D6D643DBE3","A53C46F5B157DD83366D45A8E99A244934A14C46"],"consensus_weight_fraction":3.713294E-4,"guard_probability":6.572673E-4,"middle_probability":4.4957557E-4,"exit_probability":0.0,"recommended_version":true,"measured":true},
{"nickname":"csailmitexit","fingerprint":"A53C46F5B157DD83366D45A8E99A244934A14C46","or_addresses":["128.31.0.13:443"],"exit_addresses":["128.31.0.13"],"dir_address":"128.31.0.13:80","last_seen":"2021-10-09 14:00:00","last_changed_address_or_port":"2017-10-12 21:00:00","first_seen":"2013-10-02 01:00:00","running":true,"flags":["Exit","Fast","Running","Stable","V2Dir","Valid"],"country":"us","country_name":"United States of America","as":"AS3","consensus_weight":64000,"verified_host_names":["tor-exit.csail.mit.edu"],"last_restarted":"2021-10-02 18:35:25","bandwidth_rate":100663296,"bandwidth_burst":268435456,"observed_bandwidth":57038449,"advertised_bandwidth":57038449,"exit_policy":["reject 0.0.0.0/8:*","reject 169.254.0.0/16:*","reject 127.0.0.0/8:*","reject 192.168.0.0/16:*","reject 10.0.0.0/8:*","reject 172.16.0.0/12:*","reject 128.52.0.0/16:*","reject 128.30.0.0/15:*","reject 18.0.0.0/9:*","reject 184.105.192.2:*","reject 216.218.135.114:*","reject 216.218.185.162:*","reject 216.218.208.114:*","reject 64.71.166.50:*","reject *:25","reject *:22","reject *:119","reject *:135-139","reject *:445","reject *:563","reject *:1214","reject *:4661-4666","reject *:6346-6429","reject *:6699","reject *:6881-6999","accept *:*"],"exit_policy_summary":{"reject":["22","25","119","135-139","445","563","1214","4661-4666","6346-6429","6699","6881-6999"]},"contact":"0x37C6224D225BCD7D Jon Proulx <jon AT jonproulx dot com>","platform":"Tor 0.4.5.10 on Linux","version":"0.4.5.10","version_status":"recommended","effective_family":["9715C81BA8C5B0C698882035F75C67D6D643DBE3","A53C46F5B157DD83366D45A8E99A244934A14C46"],"consensus_weight_fraction":5.166322E-4,"guard_probability":0.0,"middle_probability":0.0,"exit_probability":0.0015700718,"recommended_version":true,"measured":true}
],
"bridges_published":"2021-10-09 13:50:40",
"bridges":[
]}
*/