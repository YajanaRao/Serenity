import React from 'react';
import { Text, View } from 'react-native';
import { useCache } from '../../../hooks/useCache';
import { getYoutubePlaylist } from '../../../services/Youtube';

export interface YoutubePlaylistProps {
}

export function YoutubePlaylist(props: YoutubePlaylistProps) {
    const [youtubePlaylists, { refresh, get }] = useCache(
        'youtube_playlists',
        () => getYoutubePlaylist(),
    );

    function navigateToCollection(playlist) {
        if (playlist.type === 'Youtube') {
            navigation.navigate('Songs', {
                songs: playlist.songs,
                playlist,
            });
        }
    }

    useEffect(() => {
        if (googleAccessGiven) {
            get();
        }
    }, [googleAccessGiven, get]);

    return (
        <View>
            <Text>YoutubePlaylist</Text>
        </View>
    );
}
