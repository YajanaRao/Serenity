import * as React from "react";
import { FlatList } from "react-native";
import { Card, Container, Screen, Title } from "@serenity/components";
import {
  EntityId,
  songsSelectors,
  UI,
  useAppDispatch,
  useAppSelector,
} from "@serenity/core";
import { Extensions } from "@serenity/extensions";
import { Switch } from "react-native-paper";
import { PlayerBar } from "./components/PlayerBar";
import { Song } from "./components/Song";

export function Home() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // @ts-ignore
    dispatch(Extensions.init());
  }, [dispatch]);
  function onToggleTheme() {
    setIsSwitchOn(!isSwitchOn);
    // @ts-ignore
    dispatch(UI.toggleTheme());
  }


  const songs = useAppSelector((state) => songsSelectors.selectIds(state));
  return (
    <Screen>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <Title style={{ fontWeight: "bold", fontSize: 24 }}>Serenity</Title>
        <Switch value={isSwitchOn} onValueChange={onToggleTheme} />
      </Container>
      <Container style={{ flexDirection: "row" }}>
        <Container style={{ flex: 1, padding: 12 }}>
          <Card style={{ borderRadius: 4, marginVertical: 2 }}>
            <Title style={{ margin: 8 }}>Home</Title>
          </Card>
          <Title style={{ margin: 8 }}>Search</Title>
          <Title style={{ margin: 8 }}>Your library</Title>
        </Container>
        <Container style={{ flex: 5 }}>
          <FlatList
            data={songs}
            horizontal={true}
            keyExtractor={(item: EntityId) => `${item}`}
            renderItem={({ item }) => <Song id={item} />}
          />
        </Container>
      </Container>
      <GoogleLogin
        credentialsDetails={{
          redirectUrl: "GOOGLE_REDIRECT_URI",
          clientId: "GOOGLE_CLIENT_ID",
        }}
        getAccessToken={getAccessToken}
        getUserDetails={getUserDetails}
      />
      <PlayerBar />
    </Screen>
  );
}
