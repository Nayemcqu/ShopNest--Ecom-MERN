import {useState,useEffect}from 'react'

export default function useFetch(url,options){

    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
const controller=new AbortController();

const fetchData=async()=>{


try{

const res=await fetch(url,{
    ...options,
    signal:controller.signal
});

if(!res.ok){
    throw new Error(`HTTP error! Status: ${res.status}`);
}

const data=await res.json();
setData(data);
}

catch(err){
    if(err.name==='AbortError'){
        return;
    }
console.error(err);
setError(err);
}

finally{
    setLoading(false);
}

}
fetchData();

return()=>{
    controller.abort();
}

},[url,options]);

return{data,loading,error};


}