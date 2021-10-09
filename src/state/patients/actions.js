import * as types from "./types" // get local types

export function getPatients(payload){
    return {type: types.FETCH_PATIENTS, payload}
}
export function searchPatients(payload){
    return {type: types.SEARCH_PATIENTS, payload}
}
export function clearSearch(){
    return {type: types.CLEAR_SEARCH_RESULTS}
}