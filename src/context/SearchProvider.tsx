import { useState } from "react";
import SearchContext from "./SearchContext";
import { SearchProviderProps } from "../Component/Type";

// Context Provider
const SearchProvider: React.FC<SearchProviderProps> = ({children}) => {

    const [searchData, setSearchData] = useState<string>('');

    return (
        <SearchContext.Provider value={{searchData, setSearchData}}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider
