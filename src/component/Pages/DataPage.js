/**   region_recommender_frontend - 01.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import TextInput from "../Input/TextInput";
import SliderInput from "../Input/SliderInput";
import RegionMap from "../Input/RegionMap";
import "./DataPage.css"
import {DataRequester} from "../../common/DataRequester";
import Button from "react-bootstrap/es/Button";

import queryString from 'query-string';
import QueryStringParser from "../../Services/QueryStringParser";
import AsyncSelectInput from "../Input/AsyncSelectInput";

class DataPage extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.search !== 'undefined' && this.props.location.search !== '') {
            this.state = QueryStringParser(this.props.location.search);
        } else {
            this.state = {
                regions: null,
                features: {},
                budget: "4000",
                start: "10/08/1989",
                days: "21",
                origin: "Munich",
            };
            const today = new Date();
            const months = ["01", "02", "03", "06", "05", "06", "07", "08", "09", "10", "11", "12"];
            today.setDate(today.getDate() + 30);
            this.state.start = today.getDate() + '/' + months[today.getMonth()] + '/' + today.getFullYear();
        }
        this.state.validation_state = this.getDefaultValidationState();
    };

    getDefaultValidationState() {
        return {
            origin: "",
            start: "",
            budget: "",
            days: "",
            regions: ""
        }
    }

    data_requester = new DataRequester();

    componentDidMount() {
        this.getFeatures();
    }

    onFeatureChange = (event) => {
        let features = this.state.features;
        features[event.field].value = event.value;
        this.setState({features});
    };
    onFieldChange = (event) => {
        let validation_state = this.state.validation_state;
        validation_state[event.field] = "";
        this.setState({[event.field]: event.value, validation_state});
    };

    getFeatures = () => {
        this.data_requester.getAllFeatures().then(features => {
            this.setState({features});
        });
    };

    submitForm = (event) => {
        // prevent default form submission event
        event.preventDefault();
        let is_valid = true;
        let validation_state = this.state.validation_state;
        Object.keys(validation_state).forEach(key => {
            if (typeof this.state[key] === 'undefined' || this.state[key] === "" || (Array.isArray(this.state[key]) && this.state[key].length === 0) ) {
                is_valid = false;
                validation_state[key] = "error";
            }
        });
        if (!is_valid) {
            this.setState({validation_state});
            return;
        }
        const query_string = queryString.stringify({
            regions: this.state.regions,
            features: JSON.stringify(this.state.features),
            budget: this.state.budget,
            start: this.state.start,
            days: this.state.days,
            origin: this.state.origin.value
        });
        this.props.history.push({
            pathname: '/results',
            search: query_string
        });
    };


    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className={"data_page"}>

                    <div className={"data_group standard use_box_shadow"}>
                        <AsyncSelectInput value={this.state.origin} name={"origin"} onChange={this.onFieldChange}
                                          label={"From"} promise={this.data_requester.getAirportAutocompleteOptions}
                                          validation_state={this.state.validation_state.origin}/>
                        <TextInput value={this.state.start} type={"text"} name={"start"}
                                   onChange={this.onFieldChange}
                                   label={"Start"}
                                   validation_state={this.state.validation_state.start}/>
                        <TextInput value={this.state.budget} type={"number"} name={"budget"}
                                   onChange={this.onFieldChange} label={"Budget"}
                                   validation_state={this.state.validation_state.budget}/>
                        <TextInput value={this.state.days} type={"number"} name={"days"}
                                   onChange={this.onFieldChange}
                                   label={"Days"}
                                   validation_state={this.state.validation_state.days}/>
                    </div>
                    <div className={"data_group features use_box_shadow"}>
                        {Object.values(this.state.features).map((feature) => {
                            return <SliderInput key={feature.key}
                                                label={feature.label}
                                                name={feature.key}
                                                onChange={this.onFeatureChange}
                                                value={feature.value}/>;
                        })}
                    </div>
                    <div className={"data_group regions use_box_shadow"}>
                        <RegionMap onChange={this.onFieldChange} name={"regions"} label={"Allowed regions"}
                                   value={this.state.regions}
                        validation_state={this.state.validation_state.regions}/>
                    </div>
                    <div className={"buttons"}>
                        <Button bsSize="large"
                                bsStyle="primary"
                                type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default DataPage;
