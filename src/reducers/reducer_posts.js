import { FETCH_POSTS, FETCH_POST } from "../actions/index";
import _ from 'lodash';


export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            //ES5 syntax same as ES6 below - return {...state}
            // const post = action.payload.data;
            // const newState = { ...state, };
            // newState[post.id] = post;
            // return newState;
            return {...state, [action.payload.data.id]: action.payload.data};


        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state;
    }
}


//use lodash _.mapKeys( ) to convert array and it's values to an object
//_.mapKeys(posts, 'id)