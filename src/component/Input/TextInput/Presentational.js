/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';

import 'rc-slider/assets/index.css';
import {FormControl} from "react-bootstrap";
import InputWrapper from "../InputWrapper/index";
import PropTypes from "prop-types";


const Presentational = ({label, onChange, value, getValidationState, type, placeholder}) => (
    <InputWrapper label={label} getValidationState={getValidationState}>
        <FormControl
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            autoComplete="off"
        />
    </InputWrapper>
);

Presentational.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    getValidationState: PropTypes.string,
    placeholder: PropTypes.string
};

export default Presentational;
