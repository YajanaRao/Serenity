import * as React from "react";
import { Card, Container, Screen, Title } from "@serenity/components";
import {
  UI, useAppDispatch,
} from "@serenity/core";
import { StyleSheet } from 'react-native';
import { Switch } from "react-native-paper";
import { PlayerBar } from "./components/PlayerBar";
import PlaylistList from "./components/PlaylistList";

export function Home() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
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
      <Container style={{ flexDirection: "row", flex: 1 }}>
        <Container style={{ padding: 16, flex: 1 }}>
          <Card style={{ borderRadius: 4, marginVertical: 2 }}>
            <Title style={{ margin: 8 }}>Home</Title>
          </Card>
          <Title style={{ margin: 8 }}>Search</Title>
          <Title style={{ margin: 8 }}>Your library</Title>
        </Container>
        <Container style={{ flex: 4, overflow: "hidden" }}>
          <PlaylistList />
        </Container>
      </Container>
      <PlayerBar />
    </Screen>
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
