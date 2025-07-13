import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../pages/Shared/Loader/Loader';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;