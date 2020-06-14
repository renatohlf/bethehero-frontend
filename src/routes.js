import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './screens/Login';
import Register from './screens/Register';
import RegisterIncident from './screens/RegisterIncident';
import Profile from './screens/Profile';
import LostPassword from './screens/Auth/LostPassword/LostPassword';
import ResetPassword from './screens/Auth/ResetPassword';
import EditProfile from './screens/EditProfile/EditProfile';
import { ProtectedRoute } from './components/ProtectedRoute';

const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} /> 
            <Route exact path="/signup/" component={Register} />
            <ProtectedRoute exact path="/profile/" component={Profile} />
            <ProtectedRoute exact path="/profile/edit/" component={EditProfile} /> 
            <ProtectedRoute exact path="/incidents/new/" component={RegisterIncident} /> 
            <Route exact path="/password/lost/" component={LostPassword} /> 
            <Route exact path="/password/reset/" component={ResetPassword} /> 
        </Switch>
    </BrowserRouter> );
}
 
export default Routes;
