import React from "react";
import { Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import CompaniesList from './Company/CompaniesList'
import JobsList from "./Job/JobsList";
import Company from "./Company/Company";
import Login from "./User/Login";
import Register from "./User/Register";
import Profile from "./User/Profile";



const Routes = ( {login, register} ) => {

    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <PrivateRoute exact path='/companies'>
                <CompaniesList />
            </PrivateRoute>
            <PrivateRoute path='/companies/:handle'>
                <Company />
            </PrivateRoute>
            <PrivateRoute exact path='/jobs'>
                <JobsList />
            </PrivateRoute>
            <Route exact path='/login'>
                <Login login={login}/>
            </Route>
            <Route exact path='/register'>
                <Register register={register} />
            </Route>
            <Route exact path='/profile'>
                <Profile />
            </Route>
        </Switch>
    )
}

export default Routes;
