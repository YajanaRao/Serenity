import {groupBy} from 'lodash';
import Config from 'react-native-config';

export function getMedia() {
	return fetch(`${Config.SUPABASE_URL}/playlist?select=*`, {
		headers: {
			Apikey: Config.SUPABASE_TOKEN,
			Authorization: `Bearer ${Config.SUPABASE_TOKEN}`,
		},
	}).then(async res => {
		const response = await res.json();
		const items = response.filter(item => item.active);
		let results = groupBy(items, 'type');
		let data = Object.keys(results).map(index => {
			return {
				title: index,
				data: results[index],
			};
		});
		return data;
	});
}
