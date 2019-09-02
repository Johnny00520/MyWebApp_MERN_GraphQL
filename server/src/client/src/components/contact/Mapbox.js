import React, { useState } from 'react';
import mapboxql, { Marker } from 'mapbox-gl';

import './Mapbox.scss';

// mapboxql.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxql.accessToken = "pk.eyJ1IjoiY2hjaDY1OTciLCJhIjoiY2swMnZpYzhxMmxpZDNscDB2bHBueDRpdSJ9.R92vD4M5zN4_IOzlgzsddQ";



const Mapbox = (props) => {

    const [viewport, setViewPort] = useState()

    

    return (
        <div className="mapbox_container">
            <div className="mapbox_wrapper">

            <div id='map'>

            </div>
            </div>
        </div>
    )
}

export default Mapbox;
