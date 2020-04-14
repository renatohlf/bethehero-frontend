import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './screens/Login';
import Register from './screens/Register';
import RegisterIncident from './screens/RegisterIncident';
import Profile from './screens/Profile';

const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} /> 
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/incidents/new" component={RegisterIncident} /> 
        </Switch>
    </BrowserRouter> );
}
 
export default Routes;
