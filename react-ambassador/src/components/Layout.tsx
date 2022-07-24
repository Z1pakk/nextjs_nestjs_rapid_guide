import React, { useEffect } from 'react';
import Nav from "./Nav";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCurrentUser } from "../redux/actions/userActionCreators";
import { useLocation } from "react-router-dom";

const Layout = (props: any) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if(!user) {
            dispatch(fetchCurrentUser())
        }
    }, [])

    let header;
    if (location.pathname === '/' || location.pathname === '/backend') {
        header = <Header />;
    }

    return (
        <div>
            <Nav />

            <main>

                {header}

                <div className="album py-5 bg-light">
                    <div className="container">

                        {props.children}

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Layout;
