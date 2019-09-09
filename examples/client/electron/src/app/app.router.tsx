import authllizer from '@authllizer/core';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';

import HomeComponent from './home.component';
import SignInComponent from './signin.component';

export default class AppRouter extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <SignInRequiredRoute exact path='/' component={ HomeComponent }/>
                <SignOutRequiredRoute path='/signin' component={ SignInComponent }/>
            </Switch>
        </BrowserRouter>;
    }
}

const SignInRequiredRoute = ({component: Component, ...rest}) => {
    return <Route { ...rest } render={ (props) => {
        return authllizer.isAuthenticated()
            ? <Component { ...props } />
            : <Redirect to='/signin'/>;
    } }/>;
};

const SignOutRequiredRoute = ({component: Component, ...rest}) => {
    return <Route { ...rest } render={ (props) => {
        return !authllizer.isAuthenticated()
            ? <Component { ...props } />
            : <Redirect to={ props.location }/>;
    } }/>;
};

