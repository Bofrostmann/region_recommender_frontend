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
            value: 0
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
        return (
            <Presentational label={this.props.label} onChange={this.onSliderChange} value={this.state.value}/>
        );
    }
}

SliderInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

SliderInput.defaultProps = {
};

export default SliderInput;