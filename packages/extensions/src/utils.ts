
export function parseRss(responseData: any) {
    return rssParser.parse(responseData);
}