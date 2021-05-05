import React, {useState, useEffect} from 'react'

const useFetch= (url)=> {
    const [data, setData] = useState(null);
    const [isPending, setPendingStatus] = useState(true);
    const [error, setError] = useState(null);

    const abortController = new AbortController();
    useEffect(()=>{
        try{
            fetch(url, {signal: abortController.signal}).then((response)=>{ return response.json()} )
                .then((data)=>{
                    setData(data);
                    setPendingStatus(false);
                    setError(null);
            });   
        }
        catch(err){
            if(err.name === 'AbortError'){
                console.log("fetch aborted");
            }
            else{
                console.log("error catched")
                setPendingStatus(false);
                setError(err.message);
            }
        }
        return ()=>abortController.abort();      
    }, [url]);

    return ({data, isPending, error});
}

export default useFetch;
