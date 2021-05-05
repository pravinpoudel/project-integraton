import React from 'react'
import { Link,Route, Switch, useRouteMatch } from 'react-router-dom';
import Productdetail from "./Productdetail";
import "./Productcard.css";

const Productcard = (props)=> {
    let{url, path} = useRouteMatch();
    const playlistId = props.dataProps.id;
    const imageUrl= props.dataProps.images?props.dataProps.images.showcase:null;
   
    return (
        <>
            {imageUrl && (<div className="card">
               <Link to= {`${url}/${playlistId}`}>
               <div className="circle">
                    {imageUrl && <img src={imageUrl} />}
               </div>
               <div className="content">
               </div>
               </Link>
           </div>
           )
           }
           </>
    )
}

export default Productcard