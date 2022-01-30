import React from "react";
import { Provider } from "react-native-paper";
import { Button } from "./src/Button";
import { Hoverable } from "./src/Hoverable";
import { Headline } from "./src/Headline";
import { Title } from "./src/Title";
import { Text } from "./src/Text";
import { Icon } from "./src/Icon";
import Container from "./src/Container";
import { Card } from "./src/Card";
import Screen from "./src/Screen/Screen";
import { Spinner } from "./src/Spinner/Spinner";
import { DarkTheme, DefaultTheme } from "./src/theme";
import { Theme } from "react-native-paper/lib/typescript/types";

const ThemeProvider = ({ children, theme }: { children: React.ReactNode, theme?: Theme }) => {
  return (
    <Provider
      settings={{
        icon: (props) => <Icon {...props} />,
      }}
      theme={theme}
    >
      {children}
    </Provider>
  );
};

export {
  Headline,
  Title,
  Icon,
  Container,
  Card,
  Screen,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  Spinner,
  Text,
  Button,
  Hoverable,
};
