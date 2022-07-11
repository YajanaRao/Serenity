import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { sample } from 'lodash';
import { log } from 'utils/logging';
import { useQuery } from 'react-query';
import Config from 'react-native-config';

function getQuery() {
  return fetch('https://okmuhrunizvusvoypvis.supabase.co/rest/v1/quotes?select=*', {
    headers: {
      Apikey: Config.SUPA_BASE,
      Authorization: `Bearer ${Config.SUPA_BASE}`
  }
  })
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