import {takeEvery, call, put} from 'redux-saga/effects'
import * as types from "./types"

export default function* patientWatcher(){
    yield takeEvery(types.FETCH_PATIENTS, fetchWorker)
    yield takeEvery(types.SEARCH_PATIENTS, searchWorker)
}
function* fetchWorker(){
    let requestStart = performance.now()
    let patientList = yield call(apigetPatients)
    let requestEnd = performance.now()
    let requestLength = requestEnd - requestStart;
        let filteredPatients = filterResults(patientList) 
    
    yield put({type: types.POPULATE_PATIENTS, payload: {patients: filteredPatients, requestLength}})
    
}
function* searchWorker(action){
    let requestStart = performance.now()
    let searchResults = yield call(apiSearchPatients, action.payload)
    let requestEnd = performance.now()
    let requestLength = requestEnd - requestStart;
    
    let filteredPatients = [];
    if(searchResults.total > 0){
        filteredPatients= filterResults(searchResults)
    }
    yield put({ type: types.POPULATE_SEARCH_RESULTS, payload: {patients: filteredPatients, requestLength}})

}
function filterResults(res){

    let filteredResults = res.entry.filter(ent => (!!ent.resource.name)).sort(function (a, b) {
        if (!!a.resource.birthDate && !b.resource.birthDate) return -1; // sort by birth date existing first
        if (!a.resource.birthDate && !!b.resource.birthDate) return 1;
        if (a.resource.name[0].given[0] > b.resource.name[0].given[0]) return 1; // then sort by first name
        if (a.resource.name[0].given[0] < b.resource.name[0].given[0]) return -1;
        if (a.resource.name[0].family > b.resource.name[0].family) return 1; // then sort by last name
        if (a.resource.name[0].family < b.resource.name[0].family) return -1;
        if (a.resource.birthDate > b.resource.birthDate) return 1; // then sort by birth date value
        if (a.resource.birthDate < b.resource.birthDate) return -1;
        else return 0;
    })
    return filteredResults

}

function apigetPatients(){
    return fetch(`https://try.smilecdr.com/baseR4/Patient?_format=json`,{
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => {
        console.log("Encountered an error in the fetching operation", error.message)
    })
}

function apiSearchPatients(vals){    
    let baseURI = `https://try.smilecdr.com/baseR4/Patient?_format=json&`
    const letterRegex = /[A-Za-z]/;
    if(!!vals[0] && letterRegex.test(vals[0]) === true){
        baseURI = baseURI.concat(`given=${vals[0]}&`)
    }
    if (!!vals[1] &&  letterRegex.test(vals[1]) === true) {        
        baseURI = baseURI.concat(`family=${vals[1]}`)
    }
    
    return fetch(baseURI, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => {
        console.log("Encountered an error in the fetching operation", error.message)
    })


}