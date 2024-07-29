import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from "../components/BaseLayout";

const NotFoundPage = () => {
    return (
        <BaseLayout>
            <div>
                <h1>404 - Page Not Found</h1>
                <Link to="/">Go to Home</Link>
            </div>
        </BaseLayout>
    );
};

export default NotFoundPage;