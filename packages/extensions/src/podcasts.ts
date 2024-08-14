import { parseRss } from "./utils";
import Config from "react-native-config";

const Podcasts = {
  podcastList: [],
  async getPodcasts() {
    const response = await fetch(
      `${Config.SUPABASE_URL}/podcasts?select=*`,
      {
        headers: {
          Apikey: Config.SUPABASE_TOKEN,
          Authorization: `Bearer ${Config.SUPABASE_TOKEN}`,
        },
      }
    );
    this.podcastList = await response.json();
    return this.podcastList;
  },
  async getPodcast(url: string) {
    const response = await fetch(url);
    const responseData = await response.text();
    const rss = await parseRss(responseData);
    const data = rss.items.map((item: any) => {
      let artist = item.authors[0]?.name;
      if (item.itunes.authors.length) artist = item.itunes.authors[0]?.name;
      return {
        id: item.id,
        title: item.title,
        artist: artist,
        description: item?.description.replace(/<[^>]+>/g, "").trim(),
        cover: item.itunes.image,
        path: item.enclosures[0].url,
      };
    });
    delete rss.items;
    return data;
  },
};

export default Podcasts;
