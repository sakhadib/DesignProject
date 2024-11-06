// ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token') || localStorage.getItem('token');
    const isSignedIn = Boolean(token);

    if (!isSignedIn) {
        // Redirect to login if not signed in
        return <Navigate to="/signin" replace />;
    }

    // If signed in, render the protected component
    return children;
};

export default ProtectedRoute;
