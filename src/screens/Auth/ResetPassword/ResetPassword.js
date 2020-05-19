import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../../../services/api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useHistory } from "react-router-dom";
import queryString from 'query-string';

const ResetPassword = () => {
    const history = useHistory();
    const params = queryString.parse(history.location.search);

    const  [password, setPassword] = useState();
    const  [loading, setLoading] = useState(false);
    

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('reset_password', { email: params.email, token: params.token, password }).then(
            (res) => {
                setLoading(false);
                toast.success("Your password was successfuly updated", {
                    position: toast.POSITION.BOTTOM_RIGHT
                }, 2000);
                history.push('/');
        }).catch((error) => {
            setLoading(false);
            toast.error("Error: " + error.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
        });
    };

    return (<div className="reset-password__container">
        { loading && <LoadingSpinner /> }
        <div className="title">Enter your new password in the field below</div>

       <form className="reset-password__form" onSubmit={submit}>
           <input type="password" name="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} required/>
           <button className={"button"} type="submit">Reset password</button>
       </form>
    </div>);
};

export default ResetPassword;