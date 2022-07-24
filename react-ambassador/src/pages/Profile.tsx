import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";

const Profile = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        setFirstName(user?.first_name || '');
        setLastName(user?.last_name || '');
        setEmail(user?.email || '');
    }, [user])

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data} = await axios.put("users/info", {
            first_name,
            last_name,
            email
        })

        dispatch(setUser(data));
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put("users/password", {
            password,
            password_confirm,
        })
    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control"
                           defaultValue={first_name}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                           defaultValue={last_name}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input className="form-control"
                           defaultValue={password}
                           type="password"
                           onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input className="form-control"
                           defaultValue={password_confirm}
                           type="password"
                           onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
            </form>
        </Layout>
    );
};

export default Profile;
