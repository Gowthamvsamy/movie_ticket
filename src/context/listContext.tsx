import { createContext } from 'react'
import { MovieData } from '../component/type';

const ListContext = createContext<MovieData[] | null>(null);

export default ListContext