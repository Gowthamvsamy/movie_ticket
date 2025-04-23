import { createContext } from 'react'
import { MovieData } from '../component/type';

// context creation
const ListContext = createContext<MovieData[] | null>(null);

export default ListContext