import React, { useEffect, useState } from 'react'
import { MovieData } from '../component/type';
import ListContext from './listContext';

type ListProviderProps = {
    children: React.ReactNode;
  };

function ListProvider({ children }: ListProviderProps){

    const [listMovie, setListMovie] = useState<MovieData[]>([]);

    async function getData() {
        try {
            const response = await fetch('https://run.mocky.io/v3/611ddb01-8155-4365-8093-7233168cd012');
            const movieCardData = await response.json();
            setListMovie(movieCardData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <ListContext.Provider value={listMovie}>
        {children}
    </ListContext.Provider>
  );
}

export default ListProvider