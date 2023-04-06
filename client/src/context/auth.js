import { useState,useEffect,useContext,createContext } from "react";
const AuthContext = createContext()
// i have removed auth from dependency array because it will cause infinite loop it is howing error in console but in video he has written auth in dependency array
const AuthProvider = ({children})=>{
    const[auth,setAuth]=useState({
        user:null,
        token:""
    })
    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            const paresData = JSON.parse(data);
                setAuth({
                    ...auth,
                    user:paresData.user,
                    token:paresData.token
                })
        }
        //eslint-disable-next-line
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
// custom hook
const useAuth = ()=> useContext(AuthContext);
export {useAuth,AuthProvider};