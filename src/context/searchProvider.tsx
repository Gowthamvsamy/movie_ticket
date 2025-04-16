import { useState } from "react";
import SearchContext from "./searchContext";

interface SearchProviderProps {
    children: React.ReactNode;
};

const SearchProvider: React.FC<SearchProviderProps> = ({children}) => {

    const [searchData, setSearchData] = useState<string>('');

    return (
        <SearchContext.Provider value={{searchData, setSearchData}}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider