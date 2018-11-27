/**   region_recommender_frontend - 27.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import SliderInput from "../Input/SliderInput";

const FeedbackQuestion = ({field_name, text, value}) => (
    <div className={"feedback_question"}>
    </div>
);

FeedbackQuestion.propTypes = {
    field_name: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.number
};

export default FeedbackQuestion;
