import React from 'react';
//import { useLocation } from 'react-router-dom';
import { Row, Box, Text, Icon } from '@tlon/indigo-react';
import { StatusBarItem } from './icons/StatusBarItem';
//import { Sigil } from './icons/sigil';


const HeaderBar = (props) => {

  const display = (!window.location.href.includes('popout/'))
  ? 'grid' : 'none';

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      py={2}
    >
      <Row collapse>
        <StatusBarItem
          mr={2}
          onClick={() => window.location.href = '/apps/torb/'}
        >
          <Icon icon='Menu' color='black' />
        </StatusBarItem>
      </Row>
      <Text
        pt={2}
        fontWeight="bold"
        display={["none", "inline"]}
        fontFamily="serif"
      >
        Torb
      </Text>
      <Row justifyContent="flex-end" collapse>
        <StatusBarItem
          onClick={() => window.location.href = '/apps/grid'}
        >
          <Icon icon='Dashboard' color='black' />
        </StatusBarItem>
      </Row>
  </Box>
  );
};

export default HeaderBar;

// <Sigil ship={window.ship} size={24} color={"#000000"} classes="dib mix-blend-diff" />
// <Text ml={2} display={["none", "inline"]} fontFamily="mono">~{window.ship}</Text>
