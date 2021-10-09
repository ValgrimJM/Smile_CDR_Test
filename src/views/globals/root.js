import store, { history } from "../../state/store"
import { Provider } from "react-redux"
import { ConnectedRouter, push } from 'connected-react-router' //Connected Router is a redux binding for React Router
import { Route } from 'react-router-dom'
import App from './App'

function RootHTML() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    );
}

export default RootHTML;
