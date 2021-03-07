import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { log } from '../utils/logging';

export function useCache(key: string, query: () => Promise<any>) {
  const [data, setData] = useState([]);

  async function queryData() {
    const response = await query();
    const sessionData = {
      data: response,
      timestamp: new Date(),
    };
    AsyncStorage.setItem(key, JSON.stringify(sessionData));
    return response;
  }

  useEffect(() => {
    const fetchApi = async () => {
      const cache = await AsyncStorage.getItem(key);
      let response = [];
      if (!cache) {
        response = await queryData();
        if (!response) return [];
      } else {
        const sessionData = JSON.parse(cache);
        const now = new Date();
        if (
          new Date(sessionData.timestamp).toDateString() !==
            now.toDateString() ||
          !sessionData.data
        ) {
          log(
            `local cache time ${new Date(
              sessionData.timestamp,
            ).toDateString()} and current time ${now.toDateString()}`,
          );
          response = await queryData();
        } else {
          response = sessionData.data;
        }
      }
      setData(response);
    };
    fetchApi();
  }, []);

  return data;
}
