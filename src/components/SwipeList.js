import React from 'react';
import { Surface, IconButton, Divider} from 'react-native-paper';
import {RefreshControl, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';

import TrackContainer from '../containers/TrackContainer';

const SwipeList = props => {
    return (
      <SwipeListView
        data={props.data}
        ItemSeparatorComponent={() => <Divider inset={true} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <TrackContainer track={item} />}
        renderHiddenItem={({item}) => (
          <Surface style={styles.rowBack}>
            <IconButton
              icon="add-to-queue"
              onPress={() => props.addToQueue(item)}
            />
            <IconButton
              icon="favorite"
              onPress={() => props.addToFavorite(item)}
            />
          </Surface>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    );
}

export default SwipeList;

SwipeList.propTypes = {
  data: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  }
});