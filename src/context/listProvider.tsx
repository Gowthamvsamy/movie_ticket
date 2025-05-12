// import
import React, { useEffect, useState } from 'react'
import { ListProviderProps, MovieData } from '../Component/Type';
import ListContext from './ListContext';
import { fetchMovieData } from './Service/MovieService';

// Context provider
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