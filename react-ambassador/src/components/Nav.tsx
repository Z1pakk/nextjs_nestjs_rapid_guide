import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../redux/actions/userActionCreators";

const Nav = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);

    let menu;

    if (user) {
        menu = (
            <div className="col-md-3 text-end">
                <Link className="btn btn-primary me-2" to={"/profile"}>{user.first_name} {user.last_name}</Link>
                <Link to={"/rankings"} className="btn btn-outline-primary me-2">Rankings</Link>
                <Link to={"/stats"} className="btn btn-outline-primary me-2">Stats</Link>

                <a className="btn btn-outline-primary"
                   onClick={() => dispatch(logout())}
                >
                    Logout
                </a>
            </div>
        )
    } else {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={"/login"} className="btn btn-outline-primary me-2">Login</Link>
                <Link to={"/register"} className="btn btn-primary">Sign-up</Link>
            </div>
        )
    }



    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <NavLink
                            to={'/'}
                            className={({ isActive }) =>
                                `nav-link px-2 link-secondary${isActive ? ' link-dark' : ''}`
                            }
                        >
                            Frontend
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/backend'}
                            className={({ isActive }) =>
                                `nav-link px-2 link-secondary${isActive ? ' link-dark' : ''}`
                            }
                        >
                            Backend
                        </NavLink>
                    </li>
                </ul>

                {menu}
            </header>
        </div>
    );
};

export default Nav;
