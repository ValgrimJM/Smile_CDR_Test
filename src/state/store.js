import { createStore, applyMiddleware, combineReducers } from "redux";
import * as patientReducer from "./patients";
import {createBrowserHistory} from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import patientSaga from "./patients/sagas";

export const history = createBrowserHistory()
const rootReducer = combineReducers({
    router: connectRouter(history),
    ...patientReducer});
// export default function configureStore(initialState = {}) {
//     return createStore(
//         rootReducer,
//         initialState,
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__(),
//         applyMiddleware()
//     );
// }
const initializeSagaMiddleware = createSagaMiddleware();
const middlewares = [
    initializeSagaMiddleware,
    routerMiddleware(history)
]
const store = createStore(rootReducer, applyMiddleware(...middlewares));
initializeSagaMiddleware.run(patientSaga)

// window.reduxStore = store;

export default store;