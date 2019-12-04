import React, { useRef, useEffect } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { Surface, List, Portal } from 'react-native-paper';

interface Props {
  open: boolean;
  loadTrack(): void;
  playNext(): void;
  addToQueue(): void;
  addToFavorite(): void;
  addToPlaylist(): void;
  setClosed(): void;
}

interface State {
  open: boolean;
}

class BottomSheetView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.bs = React.createRef();
    this.sheetOpenValue = new Animated.Value(1);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.open !== state.open) {
      return {
        open: props.open,
      };
    }
    return null;
  }

  renderInner = () => {
    const { children } = this.props;
    return <View style={styles.panel}>{children}</View>;
  };
  componentDidUpdate() {
    const { open } = this.state;
    if (open && this.bs.current) {
      console.log('open render');
      this.bs.current.snapTo(0);
    } else if (this.bs.current) {
      console.log('close render');
      this.bs.current.snapTo(1);
    }
  }

  closeBottomSheet = () => {
    const { setClosed } = this.props;
    setClosed();
    this.setState({
      open: false,
    });
    console.log('closed bottom sheet');
    this.bs.current.snapTo(1);
  };

  render() {
    const { open } = this.props;
    console.log(open);
    return (
      <Portal>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: 'rgba(0,0,0, .7)',
              ...StyleSheet.absoluteFillObject,
            },
            {
              opacity: Animated.cond(
                Animated.greaterOrEq(this.sheetOpenValue, 0.95),
                0,
                1,
              ),
            },
          ]}
          pointerEvents="none"
        />
        <BottomSheet
          ref={this.bs}
          snapPoints={['100%', 0]}
          renderContent={this.renderInner}
          initialSnap={1}
          callbackNode={this.sheetOpenValue}
          onCloseEnd={this.closeBottomSheet}
          borderRadius={4}
        />
      </Portal>
    );
  }
}

export default BottomSheetView;

const styles = StyleSheet.create({
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // elevation: 12,
    zIndex: 1000,
  },
});
