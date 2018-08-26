import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from '@material-ui/core/TextField/TextField';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import blue from '@material-ui/core/es/colors/blue';
import red from '@material-ui/core/colors/red';
import withStyles from '@material-ui/core/styles/withStyles';

type Props = {
  classes: {
    underline: string,
  },
};

export class App extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return <div style={styles.container}>
      <AppBar style={styles.appBar}>
        <Toolbar id='draggable' style={styles.toolbar}>
          <Typography style={{ flex: 1 }} variant='title'>ClockWise</Typography>
          <FlatButton id='nondrag' style={{ ...styles.button, fontSize: 20 }}>-</FlatButton>
          <FlatButton id='nondrag' style={{ ...styles.button, color: red['500'] }} rippleColor={red['500']}>x</FlatButton>
        </Toolbar>
      </AppBar>

      <div style={styles.bottom}>
        <div style={{ flex: 1 }}/>
        <TextField
          fullWidth
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ classes: { underline: classes.underline }, style: { color: 'white' } }}
          label='Time'
          style={styles.input}
        />
      </div>
    </div>;
  }
}

const Classes = {
  underline: {
    '&:after': {
      borderBottomColor: blue['300'],
    },
    '&:before': {
      borderBottomColor: 'white',
    },
    '&:hover:before': {
      borderBottomColor: `${blue['900']} !important`,
    },
  },
};

const styles = {
  appBar: {
    backgroundColor: 'white',
    color: 'black',
  },

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
    backgroundColor: blue['500'],
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },

  input: {
    color: 'white',
    display: 'block',
    margin: '1rem auto',
    width: '80%',
  },

  title: {
    color: 'black',
  },

  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    height: '2rem',
    minHeight: 0,
  },
} as { [s: string]: React.CSSProperties };

export default withStyles(Classes)(App);