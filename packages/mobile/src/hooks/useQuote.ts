import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

export function useQuote() {
  const netInfo = useNetInfo()
  const [quote, setQuote] = React.useState('Intense and relaxed')
  React.useEffect(() => {
    if (netInfo.isConnected) {
      fetch('https://quotes.rest/qod.json')
        .then(response => response.json())
        .then(responseJson => {
          setQuote(responseJson.contents.quotes[0].quote);
        })
        .catch(error => {
          console.error('QuoteContainer', error);
        });
    }
  }, []);

  return quote;
}