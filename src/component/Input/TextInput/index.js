/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Presentational from "./Presentational";


class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    };

    componentDidMount() {
        this.props.onChange({field: this.props.name, value: this.state.value});
    };

    onInputChange = (event) => {
        this.setState({value: event.target.value});
        this.props.onChange({field: this.props.name, value: event.target.value});
    };

    render() {
        return (
            <Presentational label={this.props.label}
                            getValidationState={this.props.validation_state}
                            value={this.state.value}
                            onChange={this.onInputChange}
                            type={this.props.type}
                            placeholder={this.props.placeholder}/>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    validation_state: PropTypes.oneOf(['success', 'warning', 'error', '']),
    placeholder: PropTypes.string
};

TextInput.defaultProps = {
    validation_state: '',
    placeholder: "Enter text"

};

export default TextInput;