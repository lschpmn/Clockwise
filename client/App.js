'use strict';

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { blue500, red500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';

export default class App extends Component {
  render() {
    return <div style={styles.container} >
      <Toolbar id='draggable' style={styles.toolbar}>
        <ToolbarGroup>
          <ToolbarTitle text='Clockwise' style={styles.title}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton id='nondrag' style={{...styles.button, fontSize: 20}}>-</FlatButton>

          <FlatButton id='nondrag' style={{...styles.button,  color: red500}} rippleColor={red500} >x</FlatButton>
        </ToolbarGroup>
      </Toolbar>

      <div style={styles.bottom}>
        <div style={{flex: 1,}} />
        <TextField
          floatingLabelStyle={{ color: 'white' }}
          hintText='Time'
          inputStyle={{ color: 'white' }}
          style={styles.input}
          underlineFocusStyle={{borderColor: 'black'}}
        />
      </div>
    </div>;
  }
}

const styles = {
  bottom: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },

  button: {
    margin: 0,
    padding: 0,
    minWidth: '3rem',
  },

  container: {
    backgroundColor: blue500,
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },

  input: {
    display: 'block',
    margin: '0 auto',
    width: '80%',
  },

  title: {
    color: 'black',
  },

  toolbar: {
    backgroundColor: 'white',
    color: 'black',
    height: '2rem',
  },
};