import Config from 'react-native-config';

export function getMedia() {
    return fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/playlist?select=*", {
        headers: {
            Apikey: Config.SUPA_BASE,
            Authorization: `Bearer ${Config.SUPA_BASE}`
        }
    }).then(res =>
        res.json()
    )
}