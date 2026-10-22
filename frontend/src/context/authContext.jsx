import {createContext,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
export const authContext=createContext();

export function AuthProvider({children}){
const [user,setUser]=useState('');
const navigate=useNavigate();
 const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {

            try {

                const res = await fetch("/api/auth/me", {
                    credentials: "include"
                });
   if (res.status === 401) {
          setUser(null);
          return;
        }

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();

                setUser(data);

            } catch (error) {

                console.error(error);
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        getUser();

    }, []);


const login =(userData)=>{
  
    setUser(userData);
}

const logout=async()=>{
    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

setUser(null);
navigate("/login");

}

const contextValue={
    user,
    login,
    logout,
    loading
}

return(
<authContext.Provider value={contextValue}>
    {children}
</authContext.Provider>    
)



}