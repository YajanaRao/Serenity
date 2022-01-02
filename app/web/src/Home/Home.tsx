import * as React from "react";
import { Card, Container, Screen, Title } from "@serenity/components";
import {
  UI,
} from "@serenity/core";
import { Switch, ActivityIndicator } from "react-native-paper";
import { PlayerBar } from "./components/PlayerBar";
import PlaylistList from "./components/PlaylistList";

export function Home() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  function onToggleTheme() {
    setIsSwitchOn(!isSwitchOn);
    // @ts-ignore
    dispatch(UI.toggleTheme());
  }


  return (
    <Screen>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 24,
          marginHorizontal: 16
        }}
      >
        <Title style={{ fontWeight: "bold", fontSize: 24 }}>Serenity</Title>
        <Switch value={isSwitchOn} onValueChange={onToggleTheme} />
      </Container>
      <Container style={{ flexDirection: "row", flex: 1 }}>
        <Container style={{ padding: 16, width: 250 }}>
          <Card style={{ borderRadius: 4, marginVertical: 2 }}>
            <Title style={{ margin: 8 }}>Home</Title>
          </Card>
          <Title style={{ margin: 8 }}>Search</Title>
          <Title style={{ margin: 8 }}>Your library</Title>
        </Container>
        <Container style={{ flex: 1, overflow: "scroll" }}>
          <PlaylistList />
        </Container>
      </Container>
      <PlayerBar />
    </Screen>
  );
}
