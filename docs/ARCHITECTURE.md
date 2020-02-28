# Architecture

## Directory Layout

    - Components
        Platform specific dumb components live here

    - Container
        Smart Components which interacts with redux live here

    - Reducers
        Audio Library

    - Actions
    - Store
    - App.tsx

## Components

Simple Component Kit

## Redux store

    songs: [
        {
            "id": 1,
            "title": "Rap God",
            "artist": "Eminem",
            "album": "The Marshall Mathers LP 2",
            "genre": "Hip-Hop/Rap",
            "released": 2013,
            "played": false,
            "image": "https://images.unsplash.com/photo-1562872458-d92517741af5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1456&q=80"
            "lyrics": "Look, I was gonna go easy on you and not to hurt your feelings. don't be a retard
            Be a king? Think not, why be a king when you can be a God?"
        }
    ]

## Plugin Architecture

Instead of cloning modules into node_modules having a custom directory for modules would make it easiar to modify

## References

Lerna
https://github.com/lerna/lerna

Yarn Workspaces
https://classic.yarnpkg.com/en/docs/workspaces/
