import { useState,useContext,createContext } from "react";
const SearchContext = createContext()
// i have removed auth from dependency array because it will cause infinite loop it is howing error in console but in video he has written auth in dependency array
const SearchProvider = ({children})=>{
    const[auth,setAuth]=useState({
    keyword:"",
    results:[]
    })

    return (
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
// custom hook
const useSearch = ()=> useContext(SearchContext);
export {useSearch,SearchProvider};