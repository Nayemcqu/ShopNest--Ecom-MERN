import {createContext,useState} from 'react';

export const authContext=createContext();

export function AuthProvider({children}){
const [user,setUser]=useState(null);

const login =(userData)=>{
  
    setUser(userData);

    localStorage.setItem('userInfo',JSON.stringify(userData))
}

const logout=()=>{
setUser(null);
localStorage.removeItem('userInfo');
}

const contextValue={
    user,
    login,
    logout
}

return(
<authContext.Provider value={contextValue}>
    {children}
</authContext.Provider>    
)



}