/**   region_recommender_frontend - 22.09.2018
 *    Created by Created by Florian Haimerl (florian.haimerl@tum.de).
 */

import React, {Component} from 'react';
import './AreaLayout.css'
import { Map, TileLayer, Marker, Popup} from "react-leaflet";
import RegionMap from "./RegionMap";

class AreaLayout extends Component {
    render() {
        return (
           <RegionMap/>
        );
    }
}

export default AreaLayout;
