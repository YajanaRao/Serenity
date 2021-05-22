import getArtistTitle from 'get-artist-title';

const VideoRender = data => {
  if (data && (data.videoRenderer || data.playlistVideoRenderer)) {
    let videoRenderer = null;
    if (data.videoRenderer) {
      videoRenderer = data.videoRenderer;
    } else if (data.playlistVideoRenderer) {
      videoRenderer = data.playlistVideoRenderer;
    }

    const id = videoRenderer.videoId;
    const { thumbnail } = videoRenderer;
    const thumbnailImage = thumbnail.thumbnails[0].url;
    const titleText = videoRenderer.title.runs[0].text;
    // .replace('|', '').toString('ascii');
    let artist = videoRenderer.description?.runs[0].text;
    let title = titleText;
    const response = getArtistTitle(titleText);
    if (response) {
      [title, artist] = response;
    }
    // const description = videoRenderer.description?.runs[0].text;
    return {
      id,
      type: 'Youtube',
      cover: thumbnailImage,
      title,
      artist,
      path: `https://www.youtube.com/watch?v=${id}`,
    };
  }
  return {};
};

export async function getSongList(page: string, length = 20) {
  const data = page
    .split('var ytInitialData =')[1]
    .split('</script>')[0]
    .slice(0, -1);
  const initdata = JSON.parse(data);
  const {
    sectionListRenderer,
  } = initdata.contents.twoColumnSearchResultsRenderer.primaryContents;
  const items = [];
  let index = 0;
  await sectionListRenderer.contents.forEach(content => {
    if (content.itemSectionRenderer) {
      for (const item of content.itemSectionRenderer.contents) {
        if (item.videoRenderer) {
          if (index === length) {
            break
          }
          const videoRender = item.videoRenderer;
          // const playListRender = item.playlistRenderer;

          if (videoRender && videoRender.videoId) {
            items.push(VideoRender(item));
            index++;
          }
        }
      };
    }
  });
  return items;
}

