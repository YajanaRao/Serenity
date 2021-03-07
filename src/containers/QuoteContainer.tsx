import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';

import { Quote } from '../components/Quote';
import { log } from '../utils/logging';

export const QuoteContainer = () => {
  const [dataSource, setDataSource] = useState({});
  const theme = useTheme();

  useEffect(() => {
    fetch('https://quotes.rest/qod.json')
      .then(response => response.json())
      .then(responseJson => {
        setDataSource(responseJson.contents.quotes[0]);
      })
      .catch(error => {
        log.error('QuoteContainer', error);
      });
  }, []);

  return (
    <Quote
      backgroundImage={`https://source.unsplash.com/random/?${
        theme.dark ? 'black' : 'white'
      }`}
      quote={dataSource.quote}
    />
  );
};
