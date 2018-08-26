import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
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

    const inputProps = {
      classes: {
        underline: classes.underline
      },
      style: {
        color: 'white'
      },
    };

    const inputLabelProps = {
      style: {
        color: 'white'
      },
    };

    return <div style={styles.container}>
      <AppBar style={styles.appBar}>
        <Toolbar id='draggable' style={styles.toolbar}>
          <Typography style={{ flex: 1 }} variant='title'>ClockWise</Typography>
          <Button id='nondrag' style={{ ...styles.button, fontSize: 20 }}>-</Button>
          <Button id='nondrag' style={{ ...styles.button, color: red['500'] }}>x</Button>
        </Toolbar>
      </AppBar>

      <div style={styles.bottom}>
        <TextField
          fullWidth
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
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
    justifyContent: 'flex-end',
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