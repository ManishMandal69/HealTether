import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        // Navigate to login page after logout
        return <Navigate to="/" />;
    };

    // Redirect to login if user is not logged in
    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Home</h2>
                                <div>
                                    <p>Welcome, {user.username}!</p>
                                    <button className="btn btn-primary" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
