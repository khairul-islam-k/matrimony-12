import React from 'react';
import useMyDetails from '../hooks/useMyDetails';
import useAuth from '../hooks/useAuth';
import Loader from '../pages/Shared/Loader/Loader';
import { Navigate } from 'react-router';

const UserRout = ({children}) => {
    const {myBiodata, isLoading} = useMyDetails();

    const {user, loading} = useAuth();

    if (loading || isLoading) {
        return <Loader></Loader>
    }

    if (!user || myBiodata.Biodata_Id !== 'user' ) {
        return <Navigate to='/forbidden'></Navigate>
    }


    return children;
};

export default UserRout;