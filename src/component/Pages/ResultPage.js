/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';

import "./ResultPage.css"

import {DataRequester} from "../../common/DataRequester";



import queryString from 'query-string';
import ResultItem from "../ResultItem";
import QueryStringParser from "../../Services/QueryStringParser";


class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    };

    setResultsFromQueryString = (query_string) => {
        const data_requester = new DataRequester();
        return data_requester.getRecommendations(QueryStringParser(query_string)).then(results => {
            this.setState({results});
        });
    };

    componentDidMount() {
        this.setResultsFromQueryString(this.props.location.search);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            this.setResultsFromQueryString(this.props.location.search);
        }
    };

    render() {
        return (
            <div className={"result_page"}>
                {this.state.results.map((data, i) => {
                    return <ResultItem duration={data.duration} cost_stay={data.region.price} flight={data.flight}
                                       region={data.region.name} total={data.total} key={'trip_' + i}/>;
                })}
            </div>
        );
    }
}

export default ResultPage;
