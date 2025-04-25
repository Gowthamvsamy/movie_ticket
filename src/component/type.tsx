export interface innerArray {
    name?: string,
    image?: string,
}

export interface MovieData {
    [x: string]: unknown;
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

export type ListProviderProps = {
    children: React.ReactNode;
};

export interface SearchProviderProps {
    children: React.ReactNode;
};

export interface card {
    img: string,
    title: string,
    valid: string,
    coupon: string,
}

export interface Theatres {
    name: string,
    place: string,
    showtime: string[],
    address: string
}

export interface Facilities {
    icon: React.ElementType,
    name: string,
}

export interface LocationState {
    place: string;
    name: string;
    date: string;
    showtime: string;
    price: string;
    seats: string;
    discountedPrice: string;
    couponCode: string;
    setOpen: boolean;
    user_id: string;
}

export interface SeatSelectProps {
    onData: (price: number | undefined, seats: string[]) => void;
}

export interface Booking {
    poster: string;
    certified: string;
    language: string;
    title: string;
    theatre: string;
    place: string;
    date: string;
    time: string;
    price: string;
    screen: string;
    seats: string;
    isBooked?: boolean;
    user_id?: string;
    _id?: string;
}

export interface MyTokenPayload {
    id: string;
    username: string;
}