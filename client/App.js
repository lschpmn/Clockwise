'use strict';

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { blue500, white } from 'material-ui/styles/colors'

export default class App extends Component {
  render() {
    return <div style={styles.container} >
      <Toolbar id='draggable' style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text='Clockwise' style={styles.title}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton id='nondrag' >_</FlatButton>

          <FlatButton id='nondrag' >x</FlatButton>
        </ToolbarGroup>
      </Toolbar>
    </div>;
  }
}

const styles = {
  container: {
    backgroundColor: blue500,
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },

  title: {
    color: 'black',
  },

  toolbar: {
    backgroundColor: white,
    color: 'black',
    height: '2rem',
  },
};