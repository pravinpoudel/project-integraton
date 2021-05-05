import React from 'react'
import {withRouter} from 'react-router-dom';
import useFetch from "../../../../Hooks/useFetch";
const Productdetail = (props)=> {
    const url = `https://fortnite-api.com/v1/playlists/${props.match.params.id}`;
    const {data, isPending, error} = useFetch(url);
    console.log(data);
    return (
        <div>
            {isPending && <h3> loading </h3>}
            {data && <h3>{JSON.stringify(data.data)}</h3>}
        </div>
    )
}

export default withRouter(Productdetail); 