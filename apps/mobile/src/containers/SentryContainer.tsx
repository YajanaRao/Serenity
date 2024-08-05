import React, { ReactNode } from 'react';
import * as Sentry from "@sentry/react-native";

export interface SentryContainerProps {
    children: ReactNode
}

if(!__DEV__){
    Sentry.init({
        dsn: "https://94ad3322cfed4d539c476404c19fee4c@o291897.ingest.sentry.io/5767946",
        debug: false
    });
}

export function SentryContainer({ children }: SentryContainerProps) {
    return (
        <Sentry.TouchEventBoundary>
            {children}
        </Sentry.TouchEventBoundary>
    );
}
