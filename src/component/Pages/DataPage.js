/**   region_recommender_frontend - 01.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import TextInput from "../Input/TextInput";
import SliderInput from "../Input/SliderInput";
import RegionMap from "../Input/RegionMap";
import "./DataPage.css"
import {DataRequester, GetSetting} from "../../common/DataRequester";
import Button from "react-bootstrap/es/Button";

import queryString from 'query-string';
import QueryStringParser from "../../Services/QueryStringParser";
import AsyncSelectInput from "../Input/AsyncSelectInput";

import scrollToComponent from 'react-scroll-to-component';

class DataPage extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.search !== 'undefined' && this.props.location.search !== '') {
            this.state = QueryStringParser(this.props.location.search);
        } else {
            this.state = this.getDefaultState();
            this.state.regions = null;
            this.state.activities = {};
            this.state.activity_label_start = '';
            this.state.activity_label_end = '';
            this.state.activity_value_init = '';
        }
        this.state.validation_state = DataPage.getDefaultValidationState();
    };

    data_requester = new DataRequester();

    static getDefaultValidationState() {
        return {
            origin: "",
            start: "",
            budget: "",
            days: "",
            regions: ""
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (prevProps.location.search !== '')
            if (typeof prevProps.location.search !== 'undefined' && prevProps.location.search !== '' &&
                (typeof this.props.location.search === 'undefined' || this.props.location.search === '')) {
                this.setState({...this.getDefaultState(), validation_state: DataPage.getDefaultValidationState()});
            }

    }

    getDefaultState() {
        let state = this.state;
        state = {
            ...state,
            budget: "4000",
            start: "10/08/1989",
            days: "21",
            origin: "",
        };
        const today = new Date();
        const months = ["01", "02", "03", "06", "05", "06", "07", "08", "09", "10", "11", "12"];
        today.setDate(today.getDate() + 30);
        state.start = today.getFullYear() + '-' + months[today.getMonth()] + '-' + today.getDate();
        return state;
    }

    componentDidMount() {
        this.data_requester.getAllSettings()
            .then(settings => {
                const activity_label_start = GetSetting(settings, 'activity_label_start'),
                    activity_label_end = GetSetting(settings, 'activity_label_end'),
                    activity_value_init = GetSetting(settings, 'activity_value_init');
                return {activity_label_start, activity_label_end, activity_value_init};
            })
            .then(settings => {
                this.data_requester.getAllActivities().then(activities => {
                    Object.values(activities).forEach(activity => {
                        activity.value = parseInt(settings.activity_value_init, 10);
                    });
                    this.setState({...settings, activities});
                });
            });
    }

    onActivityChange = (event) => {
        let activities = this.state.activities;
        activities[event.field].value = event.value;
        this.setState({activities});
    };
    onFieldChange = (event) => {
        let validation_state = this.state.validation_state;
        validation_state[event.field] = "";
        this.setState({[event.field]: event.value, validation_state});
    };

    submitForm = (event) => {
        // prevent default form submission event
        event.preventDefault();
        let is_valid = true;
        let validation_state = this.state.validation_state;
        Object.keys(validation_state).forEach(key => {
            if (typeof this.state[key] === 'undefined' || this.state[key] === "" || (Array.isArray(this.state[key]) && this.state[key].length === 0)) {
                is_valid = false;
                validation_state[key] = "error";
                scrollToComponent(this, {
                    offset: -100, //height of header
                    align: 'top',
                    duration: 100
                });
            }
        });
        if (!is_valid) {
            this.setState({validation_state});
            return;
        }
        const query_string = queryString.stringify({
            regions: this.state.regions,
            activities: JSON.stringify(this.state.activities),
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
                        <TextInput value={this.state.start} type={"date"} name={"start"}
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
                    <div className={"data_group activities use_box_shadow"}>
                        {Object.values(this.state.activities).map((activity) => {
                            return <SliderInput key={activity.key}
                                                label={activity.label}
                                                name={activity.key}
                                                onChange={this.onActivityChange}
                                                value={activity.value}
                                                min={this.state.activity_label_start}
                                                max={this.state.activity_label_end}/>;
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
