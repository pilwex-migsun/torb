import React, { Component } from "react";
import { Text, Box, Col } from '@tlon/indigo-react';

function SidebarItem(props) {
  return(
    <p onClick={(e)=>alert('dsfsdf')}>{props.text}</p>
  )
}


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Col
        backgroundColor='white'        
        borderWidth={[1]}
        borderStyle="solid"
        borderColor="washedGray"
        px='2'
        py='4'
      >  
        <Text
          display='block'
          fontSize='1'
          fontWeight='700'
          padding='1'
          >
            Services
        </Text>
        <Col
          pl='2'
          pt='1'
        >
          <SidebarItem text='Relay Search' to='/~torb/rs'/>
        </Col>
      </Col>
    )
  }
  }


