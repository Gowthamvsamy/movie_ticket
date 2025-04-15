export interface MovieData {
    id: number,
    title?: string,
    year?: string,
    genre?: string[],
    rating?: string,
    director?: string,
    actors?: string[],
    plot?: string,
    poster?: string,
    cover_img?: string,
    runtime?: string,
    awards?: string,
    language?: string[],
    boxoffice?: string,
    production?: string[],
    certified?: string,
    type?: string,
    musician?: string,
}

export type UserRegister = {
    username: string,
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
    title: string;
    btn: string;
    fields: Field[];
    onSubmitForm?: (data: { [key: string]: string }) => void;
}