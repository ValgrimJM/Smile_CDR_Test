import '../../App.css';
import "../../styles/main.css"
import React, { Component } from 'react'
import routes from '../../routes'
import {Route, NavLink, withRouter} from 'react-router-dom' 


class App extends Component{
  render(){    
  return (
        <div className="App">
          <header className="App-header">
            <h2>Select a Page</h2>
        <NavLink to="/patients"><button>Patient Page</button></NavLink>
        <NavLink to="/questionnaire"><button>Questionnaire Page</button></NavLink>
          </header>
          <main>
            {/* add all routes to the DOM */}
            {routes.map( route => (
              <Route key={route.path} {...route}/>
            ))}
          </main>
        </div>

  );
}
}

export default withRouter((App));
