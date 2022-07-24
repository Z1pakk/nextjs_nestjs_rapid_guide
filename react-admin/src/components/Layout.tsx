import React, { Dispatch, useEffect, useState } from 'react';
import Nav from "./Nav";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../redux/actions/userActionCreators";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Layout = (props: any) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const {user, isLoading, error} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if(!user) {
            dispatch(fetchCurrentUser())
        }
    }, [])

    if (error) {
        navigate("/login");
    }

    return (
        <div>
            <Nav user={user} />

            <div className="container-fluid">
                <div className="row">
                    <Menu />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="table-responsive">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
