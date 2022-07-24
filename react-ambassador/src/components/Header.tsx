import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
    const {user} = useAppSelector(state => state.userReducer);

    const [title, setTitle] = useState('Welcome');
    const [description, setDescription] = useState('Share links to earn money');

    useEffect(() => {
        if (user) {
            setTitle(`$${user.revenue}`);
            setDescription(`You have earned this far`);
        } else {
            setTitle(`Welcome`);
            setDescription(`Share links to earn money`);
        }
    }, [user])

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">{title}</h1>
                    <p className="lead text-muted">{description}</p>
                    {!user && (
                        <p>
                            <Link to={'/login'} className="btn btn-primary my-2">Login</Link>
                            <Link to={'/register'} className="btn btn-secondary my-2">Register</Link>
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Header;
