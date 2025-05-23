import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../UserContext";

const PrivateRoute = ({ exact, path, children }) => {
    const {currentUser} = useContext(UserContext);

    if (!currentUser){
        return <Redirect to='/login' />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;
