import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate, useLocation,   } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (!user) {
        return <Navigate to='/login' state={{from:location}}  replace></Navigate>
    }
    
    return children
};

export default PrivateRoute;