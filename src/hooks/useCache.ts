import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export function useCache(key: string, query: () => Promise<any>) {
  const [data, setData] = useState([]);

  const get = () => {
    AsyncStorage.getItem(key).then(data => {
      let response = [];
      if (data) {
        response = JSON.parse(data);
        setData(response);
      } else {
        refresh();
      }
    });
  };

  const refresh = () => {
    query().then(response => {
      AsyncStorage.setItem(key, JSON.stringify(response));
      setData(response);
    });
  };

  return [data, { refresh, get }];
}
