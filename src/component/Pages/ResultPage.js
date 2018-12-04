/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';

import "./ResultPage.css"

import {DataRequester} from "../../common/DataRequester";
import scrollToComponent from 'react-scroll-to-component';

import {RingLoader} from 'react-spinners';


import ResultItem from "../ResultItem";
import QueryStringParser from "../../Services/QueryStringParser";


class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: true,
            feedback_questions: []
        }
    };

    setResultsFromQueryString = (query_string) => {
        this.setState({loading: true});
        const data_requester = new DataRequester();
        //start both requests async, since they don't depend on each other
        data_requester.getRecommendations(QueryStringParser(query_string))
            .then(results => {
                results.forEach((result, i) => {
                    result.image_url = '/media/region_placeholder_images/' + i + '.jpg';
                });
                console.log("set to false");
                this.setState({results, loading: false});
            });
        data_requester.getFeedbackQuestions()
            .then(feedback_questions => {
                this.setState({feedback_questions});
            });
    };

    componentDidMount() {
        this.setResultsFromQueryString(this.props.location.search);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        scrollToComponent(this, {
            offset: -100, //height of header + buffer of 60
            align: 'top',
            duration: 1000
        });
        if (this.props.location.search !== prevProps.location.search) {
            this.setResultsFromQueryString(this.props.location.search);
        }
    };

    render() {
        return (
            <div className={"result_page_stretcher"}>
                <div className={"spinner"}>
                    <RingLoader
                        sizeUnit={"em"}
                        size={10}
                        color={'#123abc'}
                        loading={this.state.loading}/>
                </div>
                {this.state.loading
                    ? []
                    : (<div className={"result_page"}>
                            {this.state.results.map((data, i) => {
                                return <ResultItem duration={data.duration} cost_stay={data.region.price}
                                                   flight={data.flight}
                                                   region={data.region.name} total={data.total} key={'trip_' + i}
                                                   feedback_questions={this.state.feedback_questions}
                                                   image_url={data.image_url}
                                                   result_id={data.result_id}/>
                            })}
                        </div>
                    )}
            </div>
        );
    }
}

export default ResultPage;
