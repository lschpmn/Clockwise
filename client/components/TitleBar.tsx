import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import red from '@material-ui/core/colors/red';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Clear from '@material-ui/icons/Clear';
import Remove from '@material-ui/icons/Remove';
import { ipcRenderer } from 'electron';
import * as React from 'react';

const close = () => ipcRenderer.send('close');
const minimize = () => ipcRenderer.send('minimize');

const TitleBar = () => (
  <AppBar style={styles.appBar} position='static'>
    <Toolbar id='draggable' style={styles.toolbar}>
      <Button id='nondrag' onClick={minimize}>
        <Remove />
      </Button>
      <Button id='nondrag' style={{ color: red['500'] }} onClick={close}>
        <Clear />
      </Button>
    </Toolbar>
  </AppBar>
);

const styles = {
  appBar: {
    backgroundColor: 'white',
    color: 'black',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    height: '1.5rem',
    justifyContent: 'flex-end',
    minHeight: 0,
    padding: '0.25rem 0',
  } as React.CSSProperties,
};

export default TitleBar;