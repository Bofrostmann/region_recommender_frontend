/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import Presentational from "./Presentational";
import PropTypes from "prop-types";


class SliderInput extends Component {
    constructor(props) {
        super(props);
        this.state= {
            value: this.props.value
        };
        this.onSliderChange = this.onSliderChange.bind(this);
    };

    componentDidMount() {
        this.props.onChange({field: this.props.name, value: this.state.value});
    };

    onSliderChange = (value) => {
        this.setState({value});
        this.props.onChange({field: this.props.name, value: value});
    };

    render() {
        console.log("props slider", this.props);
        return (
            <Presentational label={this.props.label} onChange={this.onSliderChange} value={this.state.value}
            max={this.props.max} min={this.props.min}/>
        );
    }
}

SliderInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number,
    min: PropTypes.string,
    max: PropTypes.string
};

SliderInput.defaultProps = {
    value: 0
};

export default SliderInput;