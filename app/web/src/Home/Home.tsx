import * as React from "react";
import { Container } from "@serenity/components";
import PlaylistList from "./components/PlaylistList";

export function Home() {
 

  return (
    
        <Container style={{ flex: 4, overflow: "hidden" }}>
          <PlaylistList />
        </Container>
     
  );
}
