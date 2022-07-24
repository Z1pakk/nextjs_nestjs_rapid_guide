import React from 'react';
import Layout from "../components/Layout";

const Error = () => {
    return (
        <Layout>
            <div className="py-5 text-center">
                <h2>Error</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="lead">Couldn't process payment!</p>
            </div>
        </Layout>
    );
};

export default Error;
