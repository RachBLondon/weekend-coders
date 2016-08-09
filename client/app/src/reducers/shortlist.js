'use strict'
import {
    SHOW_SHORTLIST
} from '../actions/types'

export default function(state = {}, action){
    switch(action.type){
        case SHOW_SHORTLIST:
    return {...state, shortlist: action.shortlist.data}
    }
    return state

}