/**   region_recommender_frontend - 22.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Map, Rectangle, TileLayer, Pane, GeoJSON} from "react-leaflet";

import data from './../data/regionGeometry';

class RegionMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        min_zoom: 2,
        zoom: 13,
        max_zoom: 13
    };

    onEachFeature = function (feature, layer) {
        const func = (e) => {
                console.log(feature.properties.u_name, feature, layer);
        };
        layer.on({
            click: func
        });
    };

    render() {
        const position = [this.state.lat, this.state.lng],
            accessToken = "pk.eyJ1Ijoic2RjciIsImEiOiIwY2ExOGIzNmExZGJlNjI4NmIwYjBlOWE3N2JiZDk4NiJ9.15p9PYoAFlTIwSjj_sdDuw";
        return (
            <div>
                <Map id={"region_map"}
                     center={position}
                     zoom={this.state.zoom}
                     minZoom={this.state.min_zoom}
                     maxZoom={this.state.max_zoom}>
                    <TileLayer url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken}
                               attribution={'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                               '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                               'Layer data © <a href="http://naturalearthdata.com/">Natural Earth</a>, ' +
                               'Imagery © <a href="http://mapbox.com">Mapbox</a>'}
                               id={'sdcr.75c657b0'}/>
                    <GeoJSON data={data} onEachFeature={this.onEachFeature}/>
                </Map>
                <input type="hidden" name="query[regions][CND_NO]"/>
                <input type="hidden" name="query[regions][CND_BC]"/>
                <input type="hidden" name="query[regions][CND_PR]"/>
                <input type="hidden" name="query[regions][CND_ON]"/>
                <input type="hidden" name="query[regions][CND_QU]"/>
                <input type="hidden" name="query[regions][CND_AT]"/>
                <input type="hidden" name="query[regions][GRL]"/>
                <input type="hidden" name="query[regions][USA_AL]"/>
                <input type="hidden" name="query[regions][USA_PN]"/>
                <input type="hidden" name="query[regions][USA_CA]"/>
                <input type="hidden" name="query[regions][USA_SW]"/>
                <input type="hidden" name="query[regions][USA_RM]"/>
                <input type="hidden" name="query[regions][USA_GP]"/>
                <input type="hidden" name="query[regions][USA_TX]"/>
                <input type="hidden" name="query[regions][USA_MW]"/>
                <input type="hidden" name="query[regions][USA_SO]"/>
                <input type="hidden" name="query[regions][USA_FL]"/>
                <input type="hidden" name="query[regions][USA_MA]"/>
                <input type="hidden" name="query[regions][USA_NE]"/>
                <input type="hidden" name="query[regions][USA_HA]"/>
                <input type="hidden" name="query[regions][MEX_BC]"/>
                <input type="hidden" name="query[regions][MEX_NO]"/>
                <input type="hidden" name="query[regions][MEX_BA]"/>
                <input type="hidden" name="query[regions][MEX_PC]"/>
                <input type="hidden" name="query[regions][MEX_YU]"/>
                <input type="hidden" name="query[regions][GTM]"/>
                <input type="hidden" name="query[regions][HND]"/>
                <input type="hidden" name="query[regions][NIC]"/>
                <input type="hidden" name="query[regions][CRI]"/>
                <input type="hidden" name="query[regions][PAN]"/>
                <input type="hidden" name="query[regions][BHS]"/>
                <input type="hidden" name="query[regions][CUB]"/>
                <input type="hidden" name="query[regions][HTI]"/>
                <input type="hidden" name="query[regions][AIA]"/>
                <input type="hidden" name="query[regions][VEN]"/>
                <input type="hidden" name="query[regions][GUY]"/>
                <input type="hidden" name="query[regions][COL]"/>
                <input type="hidden" name="query[regions][ECU]"/>
                <input type="hidden" name="query[regions][PER]"/>
                <input type="hidden" name="query[regions][BOL]"/>
                <input type="hidden" name="query[regions][BRA_NO]"/>
                <input type="hidden" name="query[regions][BRA_NE]"/>
                <input type="hidden" name="query[regions][BRA_CW]"/>
                <input type="hidden" name="query[regions][BRA_SE]"/>
                <input type="hidden" name="query[regions][BRA_SO]"/>
                <input type="hidden" name="query[regions][CHL_NC]"/>
                <input type="hidden" name="query[regions][PRY]"/>
                <input type="hidden" name="query[regions][URY]"/>
                <input type="hidden" name="query[regions][ARG_NO]"/>
                <input type="hidden" name="query[regions][ARG_CE]"/>
                <input type="hidden" name="query[regions][ARG_SO]"/>
                <input type="hidden" name="query[regions][ATA]"/>
                <input type="hidden" name="query[regions][MAR]"/>
                <input type="hidden" name="query[regions][DZA]"/>
                <input type="hidden" name="query[regions][TUN]"/>
                <input type="hidden" name="query[regions][LBY]"/>
                <input type="hidden" name="query[regions][EGY]"/>
                <input type="hidden" name="query[regions][MRT]"/>
                <input type="hidden" name="query[regions][TCD]"/>
                <input type="hidden" name="query[regions][SEN]"/>
                <input type="hidden" name="query[regions][CAF]"/>
                <input type="hidden" name="query[regions][ERI]"/>
                <input type="hidden" name="query[regions][SOM]"/>
                <input type="hidden" name="query[regions][KEN]"/>
                <input type="hidden" name="query[regions][TZA]"/>
                <input type="hidden" name="query[regions][UGA]"/>
                <input type="hidden" name="query[regions][COM]"/>
                <input type="hidden" name="query[regions][ZAF]"/>
                <input type="hidden" name="query[regions][MDG]"/>
                <input type="hidden" name="query[regions][NAM]"/>
                <input type="hidden" name="query[regions][BWA]"/>
                <input type="hidden" name="query[regions][ZMB]"/>
                <input type="hidden" name="query[regions][MOZ]"/>
                <input type="hidden" name="query[regions][ISR]"/>
                <input type="hidden" name="query[regions][JOR]"/>
                <input type="hidden" name="query[regions][LBN]"/>
                <input type="hidden" name="query[regions][IRQ]"/>
                <input type="hidden" name="query[regions][IRN]"/>
                <input type="hidden" name="query[regions][ARE]"/>
                <input type="hidden" name="query[regions][SAU]"/>
                <input type="hidden" name="query[regions][OMN]"/>
                <input type="hidden" name="query[regions][QAT]"/>
                <input type="hidden" name="query[regions][ARM]"/>
                <input type="hidden" name="query[regions][RUS_WE]"/>
                <input type="hidden" name="query[regions][RUS_SO]"/>
                <input type="hidden" name="query[regions][RUS_CE]"/>
                <input type="hidden" name="query[regions][RUS_EA]"/>
                <input type="hidden" name="query[regions][PAK]"/>
                <input type="hidden" name="query[regions][NPL]"/>
                <input type="hidden" name="query[regions][BTN]"/>
                <input type="hidden" name="query[regions][IND_NO]"/>
                <input type="hidden" name="query[regions][IND_NE]"/>
                <input type="hidden" name="query[regions][IND_EA]"/>
                <input type="hidden" name="query[regions][IND_WE]"/>
                <input type="hidden" name="query[regions][IND_SO]"/>
                <input type="hidden" name="query[regions][LKA]"/>
                <input type="hidden" name="query[regions][MDV]"/>
                <input type="hidden" name="query[regions][MMR]"/>
                <input type="hidden" name="query[regions][THA_NO]"/>
                <input type="hidden" name="query[regions][THA_SO]"/>
                <input type="hidden" name="query[regions][VNM]"/>
                <input type="hidden" name="query[regions][MYS_WE]"/>
                <input type="hidden" name="query[regions][MYS_BO]"/>
                <input type="hidden" name="query[regions][IDN_SU]"/>
                <input type="hidden" name="query[regions][IDN_BA]"/>
                <input type="hidden" name="query[regions][IDN_RE]"/>
                <input type="hidden" name="query[regions][PHL]"/>
                <input type="hidden" name="query[regions][CHN_NE]"/>
                <input type="hidden" name="query[regions][CHN_NO]"/>
                <input type="hidden" name="query[regions][CHN_NW]"/>
                <input type="hidden" name="query[regions][CHN_SW]"/>
                <input type="hidden" name="query[regions][CHN_SC]"/>
                <input type="hidden" name="query[regions][CHN_SE]"/>
                <input type="hidden" name="query[regions][CHN_EA]"/>
                <input type="hidden" name="query[regions][TWN]"/>
                <input type="hidden" name="query[regions][JPN]"/>
                <input type="hidden" name="query[regions][KOR]"/>
                <input type="hidden" name="query[regions][PRK]"/>
                <input type="hidden" name="query[regions][MNG]"/>
                <input type="hidden" name="query[regions][UZB]"/>
                <input type="hidden" name="query[regions][KGZ]"/>
                <input type="hidden" name="query[regions][KAZ]"/>
                <input type="hidden" name="query[regions][AFG]"/>
                <input type="hidden" name="query[regions][AUS_WE]"/>
                <input type="hidden" name="query[regions][AUS_NE]"/>
                <input type="hidden" name="query[regions][AUS_SO]"/>
                <input type="hidden" name="query[regions][NZL]"/>
                <input type="hidden" name="query[regions][PNG]"/>
                <input type="hidden" name="query[regions][FSM]"/>
                <input type="hidden" name="query[regions][SLB]"/>
                <input type="hidden" name="query[regions][PYF]"/>
                <input type="hidden" name="query[regions][NOR]"/>
                <input type="hidden" name="query[regions][FIN]"/>
                <input type="hidden" name="query[regions][SWE]"/>
                <input type="hidden" name="query[regions][ISL]"/>
                <input type="hidden" name="query[regions][DEU]"/>
                <input type="hidden" name="query[regions][AUT]"/>
                <input type="hidden" name="query[regions][NLD]"/>
                <input type="hidden" name="query[regions][CHE]"/>
                <input type="hidden" name="query[regions][FRA]"/>
                <input type="hidden" name="query[regions][SVN]"/>
                <input type="hidden" name="query[regions][IRL]"/>
                <input type="hidden" name="query[regions][GBR_SC]"/>
                <input type="hidden" name="query[regions][GBR_EN]"/>
                <input type="hidden" name="query[regions][CZE]"/>
                <input type="hidden" name="query[regions][HUN]"/>
                <input type="hidden" name="query[regions][EST]"/>
                <input type="hidden" name="query[regions][POL]"/>
                <input type="hidden" name="query[regions][BLR]"/>
                <input type="hidden" name="query[regions][ROU]"/>
                <input type="hidden" name="query[regions][SRB]"/>
                <input type="hidden" name="query[regions][ALB]"/>
                <input type="hidden" name="query[regions][FRA_CO]"/>
                <input type="hidden" name="query[regions][ITA]"/>
                <input type="hidden" name="query[regions][GRC_ML]"/>
                <input type="hidden" name="query[regions][GRC_IS]"/>
                <input type="hidden" name="query[regions][ESP_ML]"/>
                <input type="hidden" name="query[regions][ESP_BA]"/>
                <input type="hidden" name="query[regions][ESP_CA]"/>
                <input type="hidden" name="query[regions][PRT]"/>
                <input type="hidden" name="query[regions][PRT_IS]"/>
                <input type="hidden" name="query[regions][TUR]"/>
                <input type="hidden" name="query[regions][CYP]"/>
            </div>
    );
    }
    }

    export default RegionMap;
