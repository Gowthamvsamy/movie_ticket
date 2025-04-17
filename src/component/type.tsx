export interface innerArray {
    name?: string,
    image?: string,
}

export interface MovieData {
    id: number,
    title?: string,
    year?: string,
    genre?: string[],
    rating?: string,
    director?: innerArray[],
    actors?: innerArray[],
    plot?: string,
    poster?: string,
    cover_img?: string,
    runtime?: string,
    awards?: string,
    language?: string[],
    boxoffice?: string,
    production?: innerArray[],
    certified?: string,
    type?: string,
    musician?: innerArray[],
}

export type UserRegister = {
    username: string,
    email: string,
    password: string,
};

export type UserLogin = {
    email: string,
    password: string,
};


export interface Field {
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
}

export interface FormProps {
    title: string,
    btn: string,
    fields: Field[],
    onSubmitForm?: (data: { [key: string]: string }) => void,
}

export type CrewKey = 'director' | 'production' | 'musician';

export interface SearchContextType {
    searchData: string;
    setSearchData: React.Dispatch<React.SetStateAction<string>>;
}

export type TabItem = {
    label: string;
};

export interface Movie {
    id: number,
    rating?: string,
    title?: string,
    genre?: string[],
    poster?: string,
    type?: 'movie' | 'series'
}

export type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
};

export interface JwtPayload {
    exp: number;
}