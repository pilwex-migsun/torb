import React, { Component } from 'react';
//import { BrowserRouter, Switch, Route} from "react-router-dom";
import _ from 'lodash';
import { Box } from '@tlon/indigo-react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import light from './themes/light';
import dark from './themes/dark';
import { api } from './lib/api';
import Channel from './lib/channel'
import { store } from './lib/store';
import Subscription from './lib/subscription';
import Body from "./components/body";
import HeaderBar from "./components/header-bar";
//import Sidebar from "./components/sidebar";

export class Root extends Component {
  constructor(props) {
    super(props);
    this.state = store.state;
    this.state.dark = false,

    store.setStateHandler(this.setState.bind(this));
    this.updateTheme = this.updateTheme.bind(this);
  }
  
  updateTheme(updateTheme) {
    this.setState({ dark: updateTheme });
  }

  componentDidMount() {

    const channel = new Channel();
    api.setChannel(window.ship, channel);

    this.subscription = new Subscription(store, api, channel);
    this.subscription.start();

    this.themeWatcher = window.matchMedia('(prefers-color-scheme: dark)');
    this.setState({ dark: this.themeWatcher.matches });
    this.themeWatcher.addListener(this.updateTheme);
};
   
  render() {

    return (
      <ThemeProvider theme={this.state.dark ? dark : light}>
        <Box
          display='flex'
          flexDirection='column'
          backgroundColor='white'
          height='100%'
          width='100%'
          px={[0,4]}
          pb={[0,4]}
        >
          <HeaderBar />
            <Box
              height='100%'
              display='flex'
              flexDirection='row'
              mt='2'
            >
              <Body target='relay-search' api={api} state={this.state} />
            </Box>
        </Box>
      </ThemeProvider>
    )
  }
}