import * as React from 'react';
import { FlatList } from 'react-native';
import { Container, Screen, Title } from '@serenity/components';
import './Home.css'
import logo from '../logo.svg';
import { songAdded, songsSelectors, UI, useAppDispatch, useAppSelector } from '@serenity/core';
import { Extensions } from '@serenity/extensions';
import { Switch } from 'react-native-paper';
import { PlayerBar } from './components/PlayerBar';
import { Song } from './components/Song';

export function Home() {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        // @ts-ignore
        dispatch(Extensions.init());
    }, [dispatch])
    function onToggleTheme() {
        setIsSwitchOn(!isSwitchOn);
        // @ts-ignore
        dispatch(UI.toggleTheme());
        // @ts-ignore
        dispatch(songAdded({
            title: "New song",
            artist: "New artist",
            album: "New album",
            path: ''
        }));
    }


    // @ts-ignore
    const songs = useAppSelector(state => songsSelectors.selectIds(state));
    return (
        <Screen>
            <Container style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                <Title>Serenity</Title>
                <Switch value={isSwitchOn} onValueChange={onToggleTheme} />
            </Container>
            <FlatList
                data={songs}
                horizontal={true}
                // @ts-ignore
                keyExtractor={(item) => `${item}`}
                renderItem={({ item }) => <Song id={item} />}
            />
            <Container>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                </div>
            </Container>
            <PlayerBar />
        </Screen>
    );
}
