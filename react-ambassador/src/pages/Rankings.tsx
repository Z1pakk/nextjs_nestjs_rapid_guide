import React, { useEffect, useState } from 'react';
import axios from "axios";
import Layout from "../components/Layout";

const Rankings = () => {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('rankings');

                setRankings(data);
            }
        )()
    }, [])

    return (
        <Layout>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Revenue</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(rankings).map((k: any, index) => {
                    return (
                        <tr key={k}>
                            <td>{index + 1}</td>
                            <td>{k}</td>
                            <td>{rankings[k]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Layout>
    );
};

export default Rankings;
