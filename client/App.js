'use strict';

import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

export default class App extends Component {
  render() {
    return <div style={styles.container} >
      <Toolbar id='draggable' />
    </div>;
  }
}

const styles = {
  container: {
    backgroundColor: 'blue',
  },
};