import React, { ReactNode } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { TrackContainer } from '../../containers/TrackContainer';
import { TrackProps } from '../../utils/types';

export interface TrackListProps {
    songs: TrackProps[]
}

export function TrackList({ songs }: TrackListProps) {
    return (
        <FlatList
            // ListHeaderComponent={() => (
            //   <View style={{ margin: 12 }}>
            //     <View style={styles.coverContainer}>
            //       {playlist.cover ? (
            //         <FastImage
            //           source={{ uri: playlist.cover }}
            //           style={styles.artCover}
            //         />
            //       ) : (
            //         <DefaultImage style={styles.artCover} />
            //       )}
            //     </View>
            //     <View style={styles.titleContainer}>
            //       <Title>{playlist.name}</Title>
            //       <Subheading>{`by ${playlist.owner}`}</Subheading>
            //     </View>
            //     <View style={styles.buttonContainer}>
            //       <Button mode="contained" onPress={addSongToQueue}>
            //         Play All
            //       </Button>
            //     </View>
            //   </View>
            // )}
            data={songs}
            renderItem={({ item }: { item: TrackProps }) => (
                <TrackContainer track={item} />
            )}
            ItemSeparatorComponent={() => <Divider inset />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 100 }} />}
        />
    );
}
