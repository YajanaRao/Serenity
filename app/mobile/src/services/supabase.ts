import { groupBy } from 'lodash';
import Config from 'react-native-config';

export function getMedia() {
    return fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/playlist?select=*", {
        headers: {
            Apikey: Config.SUPA_BASE,
            Authorization: `Bearer ${Config.SUPA_BASE}`
        }
    }).then(async(res) => {
        const response = await res.json()
        console.log(response);
        let results = groupBy(response, 'type');
        let data = Object.keys(results).map(index => {
          return {
            title: index,
            data: results[index]
          }
        });
        return data;
    }

    )
}