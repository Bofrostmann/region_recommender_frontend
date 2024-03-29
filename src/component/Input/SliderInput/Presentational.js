/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import Slider from "rc-slider";

import 'rc-slider/assets/index.css';
import InputWrapper from "../InputWrapper/index";
import PropTypes from "prop-types";

const Presentational = ({label, onChange, value, min, max}) => (
    <InputWrapper label={label}>
        <Slider dots min={0} max={4} onChange={onChange}
                marks={{0: min, 1: '', 2: '', 3: '', 4: max}}
                value={value}/>
    </InputWrapper>
);

Presentational.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number,
    min: PropTypes.string,
    max: PropTypes.string
};

export default Presentational;
