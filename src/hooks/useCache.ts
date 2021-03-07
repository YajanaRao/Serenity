import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useCache(key: string, query: () => Promise<any>) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const cache = await AsyncStorage.getItem(key);
      if (!cache) {
        const response = await query();
        console.log('response', response);
        AsyncStorage.setItem(key, JSON.stringify(response));
        setData(response);
      }
      setData(JSON.parse(cache));
    };
    fetchApi();
  }, []);

  return data;
}
