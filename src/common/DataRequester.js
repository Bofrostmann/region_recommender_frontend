/**   region_recommender_frontend - 05.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import axios from 'axios';
import CONSTANTS from '../CONSTANTS';

export class DataRequester {
    constructor() {
        this.api_base_path = CONSTANTS.API_URL;
    }

    getAllFeatures() {
        return axios.get(this.api_base_path + '/features')
            .then(response => {
                return response.data;
            });
    };

    getRecommendations(settings) {
        const session_key_container = localStorage.getItem('token');
        if (session_key_container !== null) {
            settings.session_key_container = session_key_container;
        }
        return axios.post(this.api_base_path + '/recommendations', settings).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log("recommendations", response.data.result);
            return response.data.result;
        });
    };

    getAllRegions() {
        return axios.get(this.api_base_path + '/regions')
            .then(response => {
                return response.data;
            });
    };

    getAirportAutocompleteOptions = (input) => {
        return axios.post(this.api_base_path + '/airportAutocomplete', {query: input})
            .then(response => {
                response.data.result.forEach(airport => {
                    airport.value = airport.code;
                    airport.label = airport.name + ': ' + airport.city + ' ' + airport.country + ' (' + airport.code + ')';
                });
                return response.data.result;
            })
    };

    getFeedbackQuestions() {
        return axios.get(this.api_base_path + '/getActiveFeedbackQuestions').then(response => {
            return response.data;
        });
    };

    submitFeedbackQuestions(data) {
        return axios.post(this.api_base_path + '/submitFeedbackQuestions', {data}).then(response => {
            return response.data.success;
        });

    };
}

