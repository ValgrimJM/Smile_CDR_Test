import * as types from "./types" //import local types

const initialState = Object.assign({
    patientList: [],
    searchResults: [],
    requestLength: 0,
    searchLength: 0,
    patientTotal: 0,
    searchTotal: 0,
})

function patientReducer(state = initialState, action){
    if (action.type === types.POPULATE_PATIENTS){
        return{
            ...state,
            patientList: action.payload.patients,
            patientTotal: action.payload.patients.length,
            requestLength: action.payload.requestLength
        }
    }
    if (action.type === types.POPULATE_SEARCH_RESULTS){
        return{
            ...state,
            searchResults: action.payload.patients,
            searchTotal: action.payload.patients.length,
            searchLength: action.payload.requestLength
        }
    }
    if(action.type === types.CLEAR_SEARCH_RESULTS){
        return{
            ...state,
            searchResults: [],
            searchTotal: 0,
            searchLength: 0,
        }
    }
    return state;
}


export default patientReducer;