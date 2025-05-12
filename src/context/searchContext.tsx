import { createContext } from "react";
import { SearchContextType } from "../Component/Type";

// Context creation
const SearchContext = createContext<SearchContextType | null>(null);

export default SearchContext