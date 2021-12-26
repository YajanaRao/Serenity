import * as rssParser from 'react-native-rss-parser';

export function parseRss(responseData: any) {
    return rssParser.parse(responseData);
}