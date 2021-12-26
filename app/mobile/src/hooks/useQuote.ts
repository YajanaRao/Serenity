import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { sample } from 'lodash';
import { log } from 'utils/logging';
import { useQuery } from 'react-query';

function getQuery() {
  return fetch('https://gist.githubusercontent.com/YajanaRao/3917a962bbe8462ac5083da2186b7c3d/raw/001db7423543f53c0fd72273c333b53d32d50f7d/quotes.json')
    .then(response => response.json())
    .catch(error => {
      log.error('QuoteContainer', error);
    })
}

export function useQuote() {
  const { isConnected } = useNetInfo()
  let quote = { quote: '', author: '' };
  const { data, isLoading } = useQuery('quote', getQuery)
  if (isConnected) {
    quote = sample(data);
  }
  return {quote, isLoading};
}