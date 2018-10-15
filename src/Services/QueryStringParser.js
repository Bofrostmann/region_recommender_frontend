import queryString from "query-string";
import {DataRequester} from "../common/DataRequester";

/**   region_recommender_frontend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */


export default function(query_string) {
    const query = queryString.parse(query_string);
    query.features = JSON.parse(query.features);
    return {
        regions: query.regions,
        features: query.features,
        budget: query.budget,
        start: query.start,
        days: query.days,
        origin: query.origin || ''
    };
}