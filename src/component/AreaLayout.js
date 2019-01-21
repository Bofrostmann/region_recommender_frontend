/**   region_recommender_frontend - 22.09.2018
 *    Created by Created by Florian Haimerl (florian.haimerl@tum.de).
 */

import React, {Component} from 'react';
import './AreaLayout.css'

import {Route, Link} from "react-router-dom";
import DataPage from "./Pages/DataPage";
import ResultPage from "./Pages/ResultPage";
import {DataRequester, GetSetting} from "../common/DataRequester";

class AreaLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main_title: 'Welcome'
        }
    };

    componentDidMount() {
        const api = new DataRequester();

        api.getAllSettings()
            .then(settings => {
                this.setState({main_title: GetSetting(settings, 'main_title')});
            });
    }

    render() {
        return (
            <div>
                <div className={"header"}>
                    <Link to='/'>{this.state.main_title}</Link>
                </div>
                <div className={"layout"}>
                    <div className={"main"}>
                        <Route path={"/"} component={DataPage}/>
                        <Route path={"/results"} component={ResultPage}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AreaLayout;
