export type SearchStackParamList = {
    Search: undefined;
    Filter: { genre: GenreProps };
};


export interface GenreProps {
    colors: [];
    title: string;
    image: string;
}