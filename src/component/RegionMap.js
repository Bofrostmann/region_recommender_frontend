/**   region_recommender_frontend - 22.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component, createRef} from 'react';
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import PropTypes from 'prop-types';

import {Region} from '../Services/Region';

import REGION_GEOMETRY from '../data/regionGeometry';
import REGIONS from '../data/regions';


function getTargetsLayerGroupAtZoom(layer, zoomLevel, hierarchieNode) {
    if(hierarchieNode.layerGroup.hasLayer(layer)) {
        if(!('subregions' in hierarchieNode) || zoomLevel <= hierarchieNode.max_zoom_level || hierarchieNode.is_recommender_region)  {
            // in leaf, or intermediate node is okay for zoomLevel
            return hierarchieNode.layerGroup;
        } else {
            for(var i in hierarchieNode.subregions) {
                var layerGroup = getTargetsLayerGroupAtZoom(layer, zoomLevel, hierarchieNode.subregions[i]);
                if(layerGroup)
                    return layerGroup;
            }
        }
    }
    return null;
}


const getHoverStyle = is_selected => ({
    weight: 1,
    fillColor: is_selected ? '#0f0' : '#08f',
    fillOpacity: is_selected ? 0.9 : 0.2
});

const getColor = isSelected => ((isSelected===undefined || isSelected)? '#0f0' : '#fff');

const style = feature => ({
    weight: 1,
    fill: true,
    fillColor: getColor(feature.is_selected),
    fillOpacity: .5
});

class RegionMap extends Component {
    constructor(props) {
        super(props);
        this.zoom = 2;
        this.main_region = new Region(REGIONS);
        this.mouseLeaveAtZoom = this.mouseLeaveAtZoom.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.mapRef = createRef();
    };

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("region",this.main_region);
        const leaves = this.main_region.getLeafRegions();
        console.log(leaves[10]);
        console.log(leaves[10].findParentAtZoomLevel(3));

    }

    mouseEnterAtZoom = (target, zoom_level) => {
        /*
        var layerGroup = getTargetsLayerGroupAtZoom(target, zoomLevel, mapData.world_hierarchie_node);
        layerGroup.eachLayer((layer) => {target.setStyle(getHoverStyle(false));});
*/
        target.setStyle(getHoverStyle(true));
    };

    mouseLeaveAtZoom =  (target, zoom_level) => {
        target.setStyle(style(target.feature));
    };


    onEachFeature = (feature, layer) => {
        layer.bindTooltip(feature.properties.u_name, {sticky: true});
        feature.is_selected = true;
        layer.className = 'test' + feature.properties.u_name;
        this.main_region.insertLayer(feature,layer);

        const onMouseEnter = event => {
            this.mouseEnterAtZoom(event.target, this.state.zoom);
        };

        const onMouseLeave = event => {
            this.mouseLeaveAtZoom(event.target, this.state.zoom);
        };

        layer.on({
            click: this.toggleCountry,
            mouseover: onMouseEnter,
            mouseout: onMouseLeave
        });
    };

    render() {
        const position = [this.props.lat, this.props.lng],
            accessToken = "pk.eyJ1Ijoic2RjciIsImEiOiIwY2ExOGIzNmExZGJlNjI4NmIwYjBlOWE3N2JiZDk4NiJ9.15p9PYoAFlTIwSjj_sdDuw";
        return (
            <div>
                <Map id={"region_map"}
                     center={position}
                     zoom={this.zoom}
                     minZoom={this.props.min_zoom}
                     maxZoom={this.props.max_zoom}>
                    <TileLayer url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken}
                               attribution={'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                               '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                               'Layer data © <a href="http://naturalearthdata.com/">Natural Earth</a>, ' +
                               'Imagery © <a href="http://mapbox.com">Mapbox</a>'}
                               id={'sdcr.75c657b0'}/>
                    <GeoJSON data={REGION_GEOMETRY} onEachFeature={this.onEachFeature} style={style} ref={this.mapRef}/>
                </Map>
                {this.main_region.getLeafRegions().map((element, i) =>
                    <input type="hidden" name={"query[regions][" + element.u_name + "]"} key={element.u_name}/>
                )}
            </div>
        );
    }
}

RegionMap.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    min_zoom: PropTypes.number,
    max_zoom: PropTypes.number
};

RegionMap.defaultProps = {
    lat: 51.505,
    lng: -0.09,
    min_zoom: 2,
    max_zoom: 13
};

export default RegionMap;
