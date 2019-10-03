import React, { useState } from 'react';
import { Surface, IconButton, Divider, Button, Dialog, Portal, List } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import TrackContainer from '../containers/TrackContainer';

const SwipeList = props => {
  const [visible, setVisible] = useState(false);
  const [song, setSong] = useState();
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}>
          <Dialog.Title>Add to Playlist</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Create Playlist"
              left={props => <List.Icon {...props} icon="add" />}
            />
            <List.Item
              title="Favorite"
              description={'Favorite Songs'}
              left={props => <List.Icon {...props} icon="favorite" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => props.addToFavorite(song)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <SwipeListView
        data={props.data}
        ItemSeparatorComponent={() => <Divider inset={true} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TrackContainer track={item} />}
        renderHiddenItem={({ item }) => (
          <Surface style={styles.rowBack}>
            <IconButton
              icon="add-to-queue"
              onPress={() => props.addToQueue(item)}
            />
            <IconButton
              icon="queue"
              onPress={() => {
                setVisible(true);
                setSong(item)
              }
              }
            />
          </Surface>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
  );
}

export default SwipeList;

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