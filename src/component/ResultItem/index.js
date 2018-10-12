/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import PropTypes from "prop-types";

import './ResultItem.css'

const ResultItem = ({region, cost_stay, total, duration, flight}) => (
    <div className={"result_item use_box_shadow"}>
        <div className={"trip_header"}>
            <span className={"region_name"}>{region}</span><span className={"days"}>{duration} days</span>
        </div>
        <div className="weather"> WEATHER</div>
        <div className="cost">
            <table>
                <tr>
                    <td>Stay</td>
                    <td>{cost_stay} €</td>
                </tr>
                <tr>
                    <td>Flight with {flight.name}</td>
                    <td>{flight.price} €</td>
                </tr>
                <tr className="total">
                    <td></td>
                    <td>{total} €</td>
                </tr>
            </table>
        </div>
    </div>
);

ResultItem.propTypes = {
    region: PropTypes.string,
    cost_stay: PropTypes.number,
    total: PropTypes.number,
    duration: PropTypes.number,
    flight: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        price: PropTypes.number
    })

};

export default ResultItem;
