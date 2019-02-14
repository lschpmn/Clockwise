import Button from '@material-ui/core/Button/Button';
import blue from '@material-ui/core/es/colors/blue';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import VolumeMute from '@material-ui/icons/VolumeMute';
import VolumeUp from '@material-ui/icons/VolumeUp';
import * as React from 'react';
import AlarmModal from './components/AlarmModal';
import TitleBar from './components/TitleBar';
import parse = require('parse-duration');
import prettyMs = require('pretty-ms');

type Props = {
  classes: {
    underline: string,
  },
};

type State = {
  duration: number,
  input: string,
  isAlarming: boolean,
  isMuted: boolean,
  isPlaying: boolean,
  originalDuration: number,
  startTime?: number,
};

export class App extends React.Component<Props, State> {
  textInput: any;
  tickId: number;

  state = {
    duration: 0,
    input: '',
    isAlarming: false,
    isMuted: false,
    isPlaying: false,
    originalDuration: 0,
    startTime: null,
  };

  getLabel = () => {
    const { duration } = this.state;
    if (duration > 1000) return prettyMs(duration, { secDecimalDigits: 0, verbose: true });
    else if (duration > 0) return '0 seconds';
    else return 'Time';
  };

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const duration = parse(this.state.input);
    this.setState({
      duration,
      originalDuration: duration,
      input: '',
    }, () => this.play());
    this.textInput.blur();
  };

  pause() {
    const duration = this.state.duration - (Date.now() - this.state.startTime);
    clearTimeout(this.tickId);
    this.setState({
      duration,
      isPlaying: false,
    });
  }

  play() {
    this.setState({
      isPlaying: true,
      startTime: Date.now(),
    }, this.tick);
  }

  stop = () => {
    clearTimeout(this.tickId);
    this.setState({
      isPlaying: false,
      duration: this.state.originalDuration,
    });
  };

  stopAlarm = () => this.setState({ isAlarming: false });

  tick = () => {
    const now = Date.now();
    const duration = this.state.duration - (now - this.state.startTime);

    if (duration > 0) {
      this.tickId = +setTimeout(this.tick, 250);
      this.setState({ duration, startTime: now });
    } else {
      this.setState({
        duration: 0,
        isAlarming: true,
        isPlaying: false,
      });
    }
  };

  toggleMute = () => this.setState({ isMuted: !this.state.isMuted });

  togglePlaying = () => this.state.isPlaying ? this.pause() : this.play();

  render() {
    const { classes } = this.props;
    const { isAlarming, isMuted, isPlaying, input } = this.state;

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

    console.log(this.state);

    return <div style={styles.container}>
      <TitleBar />

      <div style={styles.bottom}>
        <div style={{ display: 'flex' }}>
          <Button style={styles.button} onClick={this.stop}>
            <Stop/>
          </Button>

          <Button style={styles.button} onClick={this.togglePlaying}>
            {isPlaying ? <Pause/> : <PlayArrow/>}
          </Button>

          <Button style={styles.button} onClick={this.toggleMute}>
            {isMuted ? <VolumeMute/> : <VolumeUp/>}
          </Button>
        </div>
        <form onSubmit={this.onSubmit}>
          <TextField
            fullWidth
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
            label={this.getLabel()}
            onChange={e => this.setState({ input: e.target.value })}
            inputRef={ref => this.textInput = ref}
            style={styles.input}
            value={input}
          />
        </form>
      </div>
      {isAlarming && <AlarmModal isMuted={isMuted} onAlarmDismiss={this.stopAlarm}/>}
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
  } as React.CSSProperties,
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
  } as React.CSSProperties,
  input: {
    color: 'white',
    display: 'block',
    margin: '0 auto',
    width: '80%',
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

export default withStyles(Classes)(App);