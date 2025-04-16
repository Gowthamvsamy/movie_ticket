import { createContext } from "react";
import { SearchContextType } from "../component/type";

const SearchContext = createContext<SearchContextType | null>(null);

export default SearchContext