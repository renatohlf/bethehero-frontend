import React from 'react';
import { FiMeh } from 'react-icons/fi';

const ErrorPage = ({ error }) => {
    return( <div className="error-page__container">
        <FiMeh size={30} color={'#000'} />
        <br/>
        <div>{error}</div>
    </div>);
};

export default ErrorPage;