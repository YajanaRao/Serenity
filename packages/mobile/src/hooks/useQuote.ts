import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { sample } from 'lodash';
import { log } from 'utils/logging';

export function useQuote() {
  const { isConnected } = useNetInfo()
  const [quote, setQuote] = React.useState({ quote: 'For someone who listens to the wholeness of existence, everything is music. ', author: 'Sadhguru' })
  React.useEffect(() => {
    if (isConnected) {
      fetch('https://gist.githubusercontent.com/YajanaRao/3917a962bbe8462ac5083da2186b7c3d/raw/001db7423543f53c0fd72273c333b53d32d50f7d/quotes.json')
        .then(response => response.json())
        .then(responseJson => {
          setQuote(sample(responseJson));
        })
        .catch(error => {
          log.error('QuoteContainer', error);
        });
    }
    return
  }, [isConnected]);

  return quote;
}