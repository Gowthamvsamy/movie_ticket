import { createContext } from 'react'
import { MovieData } from '../Component/Type';

// context creation
const ListContext = createContext<MovieData[] | null>(null);

export default ListContext
