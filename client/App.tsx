import * as React from 'react';
import parse = require('parse-duration');
import AppBar from '@material-ui/core/AppBar/AppBar';
import blue from '@material-ui/core/es/colors/blue';
import Button from '@material-ui/core/Button/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import red from '@material-ui/core/colors/red';
import Replay from '@material-ui/icons/Replay';
import TextField from '@material-ui/core/TextField/TextField';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import VolumeUp from '@material-ui/icons/VolumeUp';
import withStyles from '@material-ui/core/styles/withStyles';

type Props = {
  classes: {
    underline: string,
  },
};

type State = {
  duration: number,
  input: string,
};

export class App extends React.Component<Props, State> {
  textInput: any;
  state = {
    duration: 0,
    input: '',
  };

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      duration: parse(this.state.input),
      input: '',
    });
    this.textInput.blur();
  };

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
      <AppBar style={styles.appBar} position='static'>
        <Toolbar id='draggable' style={styles.toolbar}>
          <Button id='nondrag' style={{ ...styles.menuButton, fontSize: 20 }}>-</Button>
          <Button id='nondrag' style={{ ...styles.menuButton, color: red['500'] }}>x</Button>
        </Toolbar>
      </AppBar>

      <div style={styles.bottom}>
        <div style={{ display: 'flex' }}>
          <Button style={styles.button}><Replay/></Button>
          <Button style={styles.button}><PlayArrow/></Button>
          <Button style={styles.button}><VolumeUp/></Button>
        </div>
        <form onSubmit={this.onSubmit}>
          <TextField
            fullWidth
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
            label='Time'
            onChange={e => this.setState({ input: e.target.value })}
            inputRef={ref => this.textInput = ref}
            style={styles.input}
            value={this.state.input}
          />
        </form>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    color: 'white',
    flex: 1,
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
    margin: '0 auto',
    width: '80%',
  },
  menuButton: {
    margin: 0,
    padding: 0,
    minWidth: '3rem',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    height: '1.5rem',
    justifyContent: 'flex-end',
    minHeight: 0,
    padding: '0.25rem 0',
  },
} as { [s: string]: React.CSSProperties };

export default withStyles(Classes)(App);