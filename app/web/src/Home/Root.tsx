import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from 'Home/Home';
import { useAppSelector, selectThemeType } from '@serenity/core';
import { Container, Title, Screen } from "@serenity/components";
import { Switch } from "react-native-paper";
import {
    UI, useAppDispatch,
} from "@serenity/core";
import { PlayerBar } from "./components/PlayerBar";

const ListItem = ({ title, route, onSelect, active = false }: { title: string, route: string, onSelect: () => void, active?: boolean }) => {
    return (
        <li onClick={onSelect} className={`my-1 p-2 ${active && "backdrop-saturate-50 bg-white/30"} rounded-md hover:backdrop-saturate-50 hover:bg-white/30`}>
            <Title style={{ marginLeft: 12 }}><Link to={route}>{title}</Link></Title>
        </li>
    );
}

function AppStack() {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [active, setActive] = React.useState("home");
    const dispatch = useAppDispatch();
    function onToggleTheme() {
        setIsSwitchOn(!isSwitchOn);
        // @ts-ignore
        dispatch(UI.toggleTheme());
    }

    return (
        <Screen>
            <Container
                style={styles.container}
            >
                <Title style={{ fontWeight: "bold", fontSize: 24 }}>Serenity</Title>
                <Switch value={isSwitchOn} onValueChange={onToggleTheme} />
            </Container>
            <div className='flex flex-row'>
                <div className="flex-none">
                    <ul className='mx-2 w-64'>
                        <ListItem route='/' title={"Home"} onSelect={() => setActive("home")} active={active === "home"} />
                        <ListItem route='/search' title={"Search"} onSelect={() => setActive("search")} active={active === "search"} />
                        <ListItem route='/library' title={"Your Library"} onSelect={() => setActive("library")} active={active === "library"} />
                    </ul>
                </div>
                <div className='flex-auto'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<div><h1>Hello world</h1></div>} />
                    </Routes>
                </div>
            </div>
            <PlayerBar />
        </Screen>
    )
}

export function Root() {
    const themeType = useAppSelector(selectThemeType);

    let theme = DefaultTheme;

    if (themeType === 'dark') {
        theme = DarkTheme;
    }
    return (
        <ThemeProvider
            theme={theme}
        >
            <AppStack />
        </ThemeProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 24,
        marginHorizontal: 16
    }
})
