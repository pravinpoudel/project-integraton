import React, {useEffect} from 'react'
import useFetch from "../../../Hooks/useFetch";
import Productcard from "../../Components/Products/Productcard/Productcard";

const Product = ()=> {
    const url = "https://fortnite-api.com/v1/playlists";
    const {data:datas, isPending, error} = useFetch(url);    
    let element = null;
    if(datas){
        element = <ul className="cardlist">
                {datas.data.map((element, index)=><li key={element.id}>
                            <Productcard dataProps= {element}></Productcard>
                </li>)}
            </ul>
    }
    
    const loading = <div className="centered-largeText">Loading ...</div>;
    
    return (
        <div>
               {isPending && loading}
               {datas && element}
        </div>
    )
}

export default Product;