import store, { history } from "../../state/store"
import { Provider } from "react-redux"
import { ConnectedRouter } from 'connected-react-router' //Connected Router is a redux binding for React Router
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
