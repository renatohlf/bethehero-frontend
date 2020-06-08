import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './screens/Login';
import Register from './screens/Register';
import RegisterIncident from './screens/RegisterIncident';
import Profile from './screens/Profile';
import LostPassword from './screens/Auth/LostPassword/LostPassword';
import ResetPassword from './screens/Auth/ResetPassword';
import EditProfile from './screens/EditProfile/EditProfile';

const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} /> 
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/edit" component={EditProfile} /> 
            <Route exact path="/incidents/new" component={RegisterIncident} /> 
            <Route exact path="/lost_password" component={LostPassword} /> 
            <Route exact path="/reset_password" component={ResetPassword} /> 
        </Switch>
    </BrowserRouter> );
}
 
export default Routes;
