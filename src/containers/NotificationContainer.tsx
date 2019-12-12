import * as React from 'react';
import { Snackbar } from 'react-native-paper';

import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { RootReducerType } from '../reducers';

export interface Props {
  result: string;
}

interface State {
  result: string;
  visible: boolean;
}
class NotificationContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      result: '',
      visible: false,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (!isEqual(props.result, state.result) && props.result != null) {
      return {
        result: props.result,
        visible: true,
      };
    }
    return null;
  }

  render() {
    const { result, visible } = this.state;

    return (
      <Snackbar
        style={{ marginBottom: 120, zIndex: 10 }}
        visible={visible}
        onDismiss={() => this.setState({ visible: false })}
        // duration={1000}
        action={{
          label: 'Dismiss',
          onPress: () => {
            this.setState({
              visible: false,
            });
          },
        }}
      >
        {result}
      </Snackbar>
    );
  }
}

const mapStateToProps = (state: RootReducerType) => ({
  result: state.query.message,
});

export default connect(mapStateToProps)(NotificationContainer);
