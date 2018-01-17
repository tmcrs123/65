import { GET_DATE_INTERVALS, DELETE_DATE_INTERVAL } from "../actions/TYPES2";
import _ from 'lodash'


export default (state=[],action){
    switch(action.type){
        case GET_DATE_INTERVALS:
        return action.payload;
        case DELETE_DATE_INTERVAL:
        _.remove(state, dateInterval => dateInterval._id == action.payload);
        default:
        return state
    }
}