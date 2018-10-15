/**   region_recommender_frontend - 22.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component, createRef} from 'react';
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import PropTypes from 'prop-types';

import {Region} from '../../../Services/Region';
import REGION_GEOMETRY from '../../../data/regionGeometry';
import REGIONS from '../../../data/regions';
import InputWrapper from "../InputWrapper";
import "./RegionMap.css"


class RegionMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.zoom = 2;
        this.main_region = new Region(REGIONS);
        this.all_leaf_regions = this.main_region.getLeafRegions(); // get them here once so we don't have to get them on every hover
        this.mapRef = createRef();
        this.target_hovering_over = null;
        this.selected_regions = Object.values(this.all_leaf_regions).map(element => (element.u_name));

        this.state.toggle_all = this.selected_regions.length === Object.values(this.all_leaf_regions).length;

        this.mouseLeaveAtZoom = this.mouseLeaveAtZoom.bind(this);
        this.onZoomLevelChange = this.onZoomLevelChange.bind(this);
        this.mouseEnterAtZoom = this.mouseEnterAtZoom.bind(this);
        this.onLayerClick = this.onLayerClick.bind(this);
    };

    componentDidMount() {
        this.props.onChange({field: this.props.name, value: this.selected_regions});
    };


    mouseEnterAtZoom = (target) => {
        if (this.target_hovering_over) {
            // this means, we still got some hovered layers => clear them
            this.mouseLeaveAtZoom();
        }
        this.target_hovering_over = target;
        const target_region = this.all_leaf_regions[target.feature.properties.u_name],
            parent = target_region.findParentAtZoomLevel(this.zoom);
        Object.values(parent.getLeafRegions()).forEach(region => {
            region.layer.setStyle(getHoverStyle(region.layer.feature.is_selected));
        });
    };

    mouseLeaveAtZoom = () => {
        this.target_hovering_over = null;
        Object.values(this.all_leaf_regions).forEach(region => {
            region.layer.setStyle(style(region.layer.feature));
        });
    };

    handleLayerClick = (target_region) => {
        // if any layer is set selected, unselect all layers of the layergroup
        // otherwise set all layers selected
        const leaf_regions = Object.values(target_region.getLeafRegions()),
            set_layer_active = !leaf_regions.some(region => {
                return region.layer.feature.is_selected;
            });
        leaf_regions.forEach(region => {
            region.layer.feature.is_selected = set_layer_active;
            region.layer.setStyle(style(region.layer.feature));
            const index_of_element = this.selected_regions.indexOf(region.u_name);
            if (index_of_element !== -1 && !set_layer_active) {
                this.selected_regions.splice(index_of_element, 1);
            } else if (index_of_element === -1 && set_layer_active) {
                this.selected_regions.push(region.u_name);
            }

        });
        this.props.onChange({field: this.props.name, value: this.selected_regions});
        this.setState({toggle_all: this.selected_regions.length === Object.values(this.all_leaf_regions).length});
        };

    onLayerClick(event) {
        this.handleLayerClick(this.all_leaf_regions[event.target.feature.properties.u_name].findParentAtZoomLevel(this.zoom));
    };

    toggleAll = () => {
        this.handleLayerClick(this.main_region);
    };


    onEachFeature = (feature, layer) => {
        layer.bindTooltip(feature.properties.u_name, {sticky: true});
        feature.is_selected = true;
        layer.className = 'test' + feature.properties.u_name;
        this.main_region.insertLayer(feature, layer);

        const onMouseEnter = event => {
            this.mouseEnterAtZoom(event.target);
        };
        const onMouseLeave = event => {
            this.mouseLeaveAtZoom();
        };
        layer.on({
            click: this.onLayerClick,
            mouseover: onMouseEnter,
            mouseout: onMouseLeave
        });
    };

    onZoomLevelChange(event) {
        this.zoom = event.target.getZoom();
        if (this.target_hovering_over) {
            this.mouseEnterAtZoom(this.target_hovering_over);
        }
    };

    render() {
        const position = [this.props.lat, this.props.lng],
            accessToken = "pk.eyJ1Ijoic2RjciIsImEiOiIwY2ExOGIzNmExZGJlNjI4NmIwYjBlOWE3N2JiZDk4NiJ9.15p9PYoAFlTIwSjj_sdDuw";
        return (
            <InputWrapper label={this.props.label}>
                <Map id={"region_map"}
                     center={position}
                     zoom={this.zoom}
                     minZoom={this.props.min_zoom}
                     maxZoom={this.props.max_zoom}
                     onZoomend={this.onZoomLevelChange}
                     worldCopyJump={true}>
                    <TileLayer url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken}
                               attribution={'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                               '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                               'Layer data © <a href="http://naturalearthdata.com/">Natural Earth</a>, ' +
                               'Imagery © <a href="http://mapbox.com">Mapbox</a>'}
                               id={'sdcr.75c657b0'}/>
                    <GeoJSON data={REGION_GEOMETRY} onEachFeature={this.onEachFeature} style={style} ref={this.mapRef}/>
                </Map>
                <label>
                    <input
                        name="toggle_all"
                        type="checkbox"
                        checked={this.state.toggle_all}
                        value={this.state.toggle_all}
                        onChange={this.toggleAll}/> Toggle all regions
                </label>
            </InputWrapper>
        );
    }
}

RegionMap.propTypes = {
    name: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    min_zoom: PropTypes.number,
    max_zoom: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string
};

RegionMap.defaultProps = {
    lat: 51.505,
    lng: -0.09,
    min_zoom: 1,
    max_zoom: 13
};

function getTargetsLayerGroupAtZoom(layer, zoomLevel, hierarchieNode) {
    if (hierarchieNode.layerGroup.hasLayer(layer)) {
        if (!('subregions' in hierarchieNode) || zoomLevel <= hierarchieNode.max_zoom_level || hierarchieNode.is_recommender_region) {
            // in leaf, or intermediate node is okay for zoomLevel
            return hierarchieNode.layerGroup;
        } else {
            for (var i in hierarchieNode.subregions) {
                var layerGroup = getTargetsLayerGroupAtZoom(layer, zoomLevel, hierarchieNode.subregions[i]);
                if (layerGroup)
                    return layerGroup;
            }
        }
    }
    return null;
}

const getHoverStyle = is_selected => ({
    weight: 1,
    fillColor: is_selected ? '#0f0' : '#08f',
    fillOpacity: is_selected ? 0.9 : 0.2,
});

const getColor = isSelected => ((isSelected === undefined || isSelected) ? '#0f0' : '#fff');

const style = feature => ({
    weight: 1,
    fill: true,
    fillColor: getColor(feature.is_selected),
    fillOpacity: .5
});


export default RegionMap;
