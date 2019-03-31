/**   region_recommender_frontend - 08.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import './ResultItem.css'
import SliderInput from "../Input/SliderInput";
import {Button, Image, Collapse, Well, Label} from "react-bootstrap";
import {DataRequester} from "../../common/DataRequester";

class ResultItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_questions: false,
            is_submitted: false
        };
        this.props.feedback_questions.forEach(question => {
            this.state['question_' + question.id] = 0;
        });
    };

    showFlightInfoRow = (flight) => {
        if (typeof flight.price !== 'undefined' && flight.price !== 0) {
            return (
                <tr>
                    <td><a href={flight.url} target={"_blank"}>Flights starting at </a></td>
                    <td><a href={flight.url} target={"_blank"}>{flight.price} €</a></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>No flight info available</td>
                    <td>--- €</td>
                </tr>
            )
        }
    };

    toggleQuestions = (event, value) => {
        // always hide questions, but only show them, if they were not yet submitted
        if (this.state.show_questions || !this.state.is_submitted) {
            this.setState({show_questions: value});
        }
    };

    onFeebackSubmit = event => {
        event.preventDefault();
        const api = new DataRequester();
        let answers = {};
        Object.keys(this.state).forEach(key => {
            if (key.startsWith('question')) {
                answers[key] = this.state[key];
            }
        });
        api.submitFeedbackAnswers({result_id: this.props.result_id, answers}).then(success => {
            if (success) {
                this.setState({is_submitted: true});
            }
        });
    };

    onQuestionChange = event => {
        this.setState({[event.field]: event.value});
    };

    showQuestionBlock = () => {
        if (this.state.is_submitted) {
            return (<Label bsStyle="success">
                    Thank you!
                </Label>
            );
        } else {
            return (

                <div className={"feedback_block border_box_block"}>
                    <span className={"block_header"}>Please help us improve our service by providing some feedback on this recommendation:</span>
                    <form onSubmit={this.onFeebackSubmit}>
                        {this.props.feedback_questions.map(question => {
                            return (<SliderInput label={question.text}
                                                 key={question.key}
                                                 onChange={this.onQuestionChange}
                                                 value={this.state['question_' + question.id]}
                                                 name={"question_" + question.id}
                                                 min={this.props.feedback_label_start}
                                                 max={this.props.feedback_label_end}/>);
                        })}
                        <Button block
                                bsSize="large"
                                bsStyle="primary"
                                type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            );
        }
    };


    render() {
        return (
            <div className={"result_item use_box_shadow"} onMouseEnter={event => {
                this.toggleQuestions(event, true)
            }}
                 onMouseLeave={event => {
                     this.toggleQuestions(event, false)
                 }}>
                <div className={"result_block"}>
                    <div className={"trip_header"}>
                        <span className={"region_name"}>{this.props.region}</span><span
                        className={"days"}>{this.props.duration} days</span>
                    </div>
                    {this.props.image_url === ''
                        ? []
                        : <div className="region_image">
                            <Image src={this.props.image_url} circle/>
                        </div>
                    }
                    <div className="cost">
                        <table>
                            <tbody>
                            <tr>
                                <td>Stay</td>
                                <td>{this.props.cost_stay} €</td>
                            </tr>
                            {this.showFlightInfoRow(this.props.flight)}
                            <tr className="total">
                                <td></td>
                                <td>{this.props.total} €</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.props.feedback_questions.length
                    ? (<Collapse in={this.state.show_questions}>
                        <div>
                            <Well>
                                {this.showQuestionBlock()}
                            </Well>
                        </div>
                    </Collapse>)
                    : []}

            </div>
        );
    };
}

ResultItem.propTypes = {
    region: PropTypes.string,
    cost_stay: PropTypes.number,
    total: PropTypes.number,
    duration: PropTypes.number,
    flight: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        price: PropTypes.number
    }),
    image_url: PropTypes.string,
    result_id: PropTypes.number,
    feedback_questions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        text: PropTypes.string,
        id: PropTypes.number
    })),
    feedback_label_start: PropTypes.string,
    feedback_label_end: PropTypes.string
};

export default ResultItem;
