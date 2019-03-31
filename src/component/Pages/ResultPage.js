/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';

import "./ResultPage.css"

import {DataRequester, GetSetting} from "../../common/DataRequester";
import scrollToComponent from 'react-scroll-to-component';

import {RingLoader} from 'react-spinners';


import ResultItem from "../ResultItem";
import QueryStringParser from "../../Services/QueryStringParser";


import imageExists from 'image-exists';


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
                // sometimes we reach this, after the component has been unmounted (user clicked on the header link, etc.).
                // To avoid the react warning, see: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
                results.forEach(result => {
                    result.image_url = process.env.PUBLIC_URL + '/media/region_images/' + result.region.key + '.jpg';
                    imageExists(result.image_url, exists => {
                        if (!exists) {
                            result.image_url = '';
                        }
                        this.setState({results, loading: false});
                    });
                });

            });
        data_requester.getFeedbackQuestions()
            .then(feedback_questions => {
                this.setState({feedback_questions});
            });
        data_requester.getAllSettings()
            .then(settings => {
                const feedback_label_start = GetSetting(settings, 'feedback_label_start'),
                    feedback_label_end = GetSetting(settings, 'feedback_label_end');
                this.setState({feedback_label_start, feedback_label_end});
            })
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
                                                   region={(i + 1).toString() + '. ' + data.region.name} total={data.total} key={'trip_' + i}
                                                   feedback_questions={this.state.feedback_questions}
                                                   image_url={data.image_url}
                                                   result_id={data.result_id}
                                                   feedback_label_start={this.state.feedback_label_start}
                                                   feedback_label_end={this.state.feedback_label_end}/>
                            })}
                        </div>
                    )}
            </div>
        );
    }
}

export default ResultPage;
