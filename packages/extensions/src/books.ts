import Config from 'react-native-config';

const Books = {
    bookList: [],
    async getBooks() {
            const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/books?select=*", {
                headers: {
                    Apikey: Config.SUPA_BASE,
                    Authorization: `Bearer ${Config.SUPA_BASE}`
                }
            });
            this.bookList = await response.json();
            return this.bookList;
    }
};

export default Books;