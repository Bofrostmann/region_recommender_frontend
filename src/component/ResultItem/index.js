/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import PropTypes from "prop-types";

import './ResultItem.css'
import SliderInput from "../Input/SliderInput";
import Button from "react-bootstrap/es/Button";

const showFlightInfoRow = (flight) => {
    if (typeof flight.price !== 'undefined') {
        return (
            <tr>
                <td><a href={flight.url} target={"_blank"}>Flights starting at </a></td>
                <td><a href={flight.url} target={"_blank"}>{flight.price} €</a></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>No flight info available</td>
                <td>--- €</td>
            </tr>
        )
    }
};

const ResultItem = ({region, cost_stay, total, duration, flight, feedback_questions}) => (
    <div className={"result_item use_box_shadow"}>
        {console.log(feedback_questions)}
        <div className={"trip_header"}>
            <span className={"region_name"}>{region}</span><span className={"days"}>{duration} days</span>
        </div>
        <div className="weather"> WEATHER</div>
        <div className="cost">
            <table>
                <tbody>
                <tr>
                    <td>Stay</td>
                    <td>{cost_stay} €</td>
                </tr>
                {showFlightInfoRow(flight)}
                <tr className="total">
                    <td></td>
                    <td>{total} €</td>
                </tr>
                </tbody>
            </table>
        </div>
        {feedback_questions.length
            ? (<form className={"feedback_block border_box_block"} onSubmit={event => {console.log("event", event)}}>
                <span className={"block_header"}>Feedback</span>
                {feedback_questions.map(question => {
                    return (<SliderInput label={question.text}
                    onChange={event => {console.log("event", event)}}
                    value={0}
                    name={"question_" + question.id}/>);
                })}
                <Button block
                        bsSize="large"
                        bsStyle="primary"
                        type="submit">
                    Submit
                </Button>
            </form>)
            : []}

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
    }),
    feedback_questions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        text: PropTypes.text
    }))
};

export default ResultItem;
