import { normalize, schema } from 'normalizr';

const artist = new schema.Entity('artists');

const album = new schema.Entity('albums');

const song = new schema.Entity('songs')


export function normalizeSongs(originalData) {
  return normalize(originalData, [song]);
}
export function normalizeArtists(originalData) {
  return normalize(originalData, [artist]);
}
export function normalizeAlbums(originalData) {
  return normalize(originalData, [album]);
}
