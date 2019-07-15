import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { withTheme, IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { downloadMedia, addToQueue, removeFromQueue, addToFavorite } from '../actions';

class SwiperContainer extends React.PureComponent {

  // option to enable left and right swipe
  //  
  
  
  renderLeftActions = (progress, dragX) => {
    
    const methodToCall = () => {
      this.close()
      // console.log(progress)
      this.removeFromQueue()
    }
    return (
      <Animated.View style={{ flex: 1 }}>
        <RectButton style={styles.leftAction} onPress={methodToCall}>
          <IconButton
            icon="delete"
            color='white'
            // size={20}
            onPress={() => console.log('Pressed')}
          />
        </RectButton>
     </Animated.View>
    );
  };

  download = () => {
    const item = this.props.children.props.children.props.item;
    // console.log(item);
    if(item){
      alert("Download feature will come soon")
      // this.props.downloadMedia(item)
    }
  }

  addToQueue = () => {
    const item = this.props.children.props.children.props.item;
    if(item){
      this.props.addToQueue(item);
    }
  }

  addToFavorite = () => {
    const item = this.props.children.props.children.props.item;
    if (item) {
      this.props.addToFavorite(item);
    }
  }

  removeFromQueue = () => {
    const item = this.props.children.props.children.props.item;
    // console.log(item);
    if (item) {
      this.props.close();
      this.props.removeFromQueue(item);
    }
  }

  renderQueueAction = (text, color, x, progress,action) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const methodToCall = () => {
      this.close()
      // console.log(progress)
      action()
    }

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={methodToCall}>
          {/* <Text style={styles.actionText}>{text}</Text> */}
          <IconButton
            icon="add-to-queue"
          />
        </RectButton>
      </Animated.View>
    );
  };

  renderDownloadAction = (color, x, progress, action) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const methodToCall = () => {
      this.close()
      // console.log(progress)
      action()
    }

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={methodToCall}>
          <IconButton
            icon="get-app"
            // color={Colors.red500}
            // size={20}
            onPress={() => console.log('Pressed')}
          />
        </RectButton>
      </Animated.View>
    );
  };


renderLoveAction = (color, x, progress, action) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const methodToCall = () => {
      this.close()
      // console.log(progress)
      action()
    }

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={methodToCall}>
          <IconButton
            icon="favorite"
            // color={Colors.red500}
            // size={20}
            // onPress={() => console.log('Pressed')}
          />
        </RectButton>
      </Animated.View>
    );
  };

  

  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: 'row' }}>
      {this.renderDownloadAction('#C8C7CD', 192, progress, this.download )}
      {this.renderQueueAction('Flag', '#ffab00', 128, progress, this.addToQueue)}
      {this.renderLoveAction('#497AFC', 64, progress,  this.addToFavorite)}
    </View>
  );

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  render(){
    const { children, remove } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        // onSwipeableLeftOpen={this.removeFromQueue}
        renderLeftActions={ remove ? this.renderLeftActions : false }
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    )
  }
} 
 


const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#B00020',
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
});

export default connect(null, { downloadMedia, addToQueue, removeFromQueue, addToFavorite })(withTheme(SwiperContainer));