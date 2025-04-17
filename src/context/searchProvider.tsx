import { useState } from "react";
import SearchContext from "./searchContext";
import { SearchProviderProps } from "../component/type";

const SearchProvider: React.FC<SearchProviderProps> = ({children}) => {

    const [searchData, setSearchData] = useState<string>('');

    return (
        <SearchContext.Provider value={{searchData, setSearchData}}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider