import * as React from 'react';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Alarm from '@material-ui/icons/Alarm';

type Props = {
  onAlarmDismiss: () => void,
};

type State = {
  tick: boolean,
};

export default class AlarmModal extends React.Component<Props, State> {
  timeoutId: number;

  state = {
    tick: false,
  };

  componentDidMount() {
    this.tock();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  tock = () => {
    this.setState({ tick: !this.state.tick });
    this.timeoutId = +setTimeout(this.tock, 500);
  };

  render() {
    return <div
      onClick={this.props.onAlarmDismiss}
      style={{
        ...styles.container,
        backgroundColor: this.state.tick ? red['500'] : green['500'],
      }}
    >
      <Alarm style={styles.icon} fontSize='inherit'/>
    </div>;
  }
}

const styles = {
  container: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  icon: {
    color: 'white',
    fontSize: '6rem',
  },
} as { [s: string]: React.CSSProperties };