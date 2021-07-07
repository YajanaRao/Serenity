import React from 'react';
import { Container, Screen, Title } from '@serenity/components';
import './Home.css'
import logo from '../logo.svg';

export interface HomeProps {
}

export function Home({ }: HomeProps) {
    return (
        <Screen>
            <Container>
                <Title>new one</Title>
            </Container>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </Screen>
    );
}
