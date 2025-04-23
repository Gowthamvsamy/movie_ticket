import { createContext } from "react";
import { SearchContextType } from "../component/type";

// Context creation
const SearchContext = createContext<SearchContextType | null>(null);

export default SearchContext