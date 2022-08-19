## Adding liked property to each song item vs creating a separate playlist for liked songs

## Release beta August 21

- Fix issue with progress bar in react track player
- Fix non playing songs from youtube playlist - (Taking time to load songs 🤔)
- Fix player issue with state not being in sync after closing and reopening the app
- Search youtube songs
- Global utility package for logs
<!-- https://stackoverflow.com/questions/31654244/react-native-retrieve-actual-image-sizes -->
- (Display image without cropping)[https://stackoverflow.com/questions/55761153/how-to-fit-a-large-image-in-a-view-without-stretching-cropping-the-image-in-reac] in most played and recent played songs.
- Add option to sort songs based on date/ name/ and other filters
- Manage logging consider [winston](https://www.npmjs.com/package/winston) -> Does not work with react native at this point
- Write about memo and useCallback
- Optimize icons and there usage

## Planned features

- Play and download songs from Google Drive
- Newest releases - tracks and albums
- Creating a backup on Google Drive and sync audio from it 🎶
- Searching for related songs in YouTube
- Multiple language support
- Real time lyrics
- Support for web (React Native Web) and Desktop (React Native Windows and MacOS)
- Searching for and playing music from bandcamp (including albums), and soundcloud
- Searching for albums (powered by last.fm and musicbrainz), album view, automatic song lookup based on artist and track name (in progress, can be dodgy sometimes)
- Newest releases with reviews - tracks and albums
- Browsing by popularity
- Country-specific top lists
- Listening suggestions (similar artists, albums, tracks)