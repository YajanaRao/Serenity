import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { sample } from 'lodash';
import { log } from 'utils/logging';
import { useQuery } from 'react-query';
import Config from 'react-native-config';

function getQuery() {
  return fetch(`${Config.SUPABASE_URL}/quotes?show=eq.1&select=*`, {
    headers: {
      Apikey: Config.SUPABASE_TOKEN,
      Authorization: `Bearer ${Config.SUPABASE_TOKEN}`
  }
  })
    .then(response => response.json())
    .catch(error => {
      log.error('QuoteContainer', error);
    })
}

export function useQuote() {
  const { isConnected } = useNetInfo()
  let quote = { quote: '', author: '', caption: '' };
  const { data, isLoading } = useQuery('quote', getQuery)
  if (isConnected) {
    quote = sample(data);
  }
  return {quote, isLoading};
}