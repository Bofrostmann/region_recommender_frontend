/**   region_recommender_frontend - 22.09.2018
 *    Created by Created by Florian Haimerl (florian.haimerl@tum.de).
 */

import React, {Component} from 'react';
import './AreaLayout.css'

import {Route} from "react-router-dom";
import DataPage from "./Pages/DataPage";
import ResultPage from "./Pages/ResultPage";

class AreaLayout extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <div className={"header"}>
                    Travel region recommender
                </div>
                <div className={"layout"}>
                    <div className={"nav"}>
                        <h3>Navigation TODO!</h3>
                        <div className={"item"}>
                            bla
                        </div>
                        <div className={"item"}>
                            Blub
                        </div>

                    </div>
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
