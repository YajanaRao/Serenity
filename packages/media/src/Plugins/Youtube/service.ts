const youtubeEndpoint = `https://www.youtube.com`;


export async function youtubeSearch(query: string) {
    // log.debug('searchYoutubeMusic', 'fetching youtube videos');
    const endpoint = `${youtubeEndpoint}/results?search_query=${query}`;
    return (
        fetch(endpoint)
            .then(response => response.text())
            .catch(error => console.error('youtubeSearch', error))
    );
}