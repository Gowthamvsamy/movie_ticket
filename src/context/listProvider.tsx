import React, { useEffect, useState } from 'react'
import { ListProviderProps, MovieData } from '../component/type';
import ListContext from './listContext';
import { fetchMovieData } from './service/movieService';

function ListProvider({ children }: ListProviderProps){

    const [listMovie, setListMovie] = useState<MovieData[]>([]);

    useEffect(() => {
      async function getData() {
        const data = await fetchMovieData();
        setListMovie(data);
      }
  
      getData();
    }, []);

  return (
    <ListContext.Provider value={listMovie}>
        {children}
    </ListContext.Provider>
  );
}

export default ListProvider