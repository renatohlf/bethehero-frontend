import React, { useState } from "react";
import { toast } from 'react-toastify';
import api from "../../../services/api";
import LoadingSpinner from "../../../components/LoadingSpinner";

const LostPassword = () => {

    const  [email, setEmail] = useState();
    const  [loading, setLoading] = useState(false);
    

    const submit = (e) => {
        e.preventDefault();
        api.post('lost_password', { email }).then(
            (res) => {
                setLoading(false);
                toast.success("A link was sent to your email. Check your email", {
                    position: toast.POSITION.BOTTOM_RIGHT
                }, 2000);

        }).catch((error) => {
            setLoading(false);
            toast.error("Error: " + error.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
        });
    };

    return (<div className="lost-password__container">
        { loading && <LoadingSpinner /> }
        <div className="title">Did you forgot or lost your password?</div>
        <div className="text-muted">Just fill your email bellow and we will send a email for in order to reset your password.</div>

       <form className="lost-password__form" onSubmit={submit}>
           <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
           <button className={"button"} type="submit">Send</button>
       </form>
    </div>);
};

export default LostPassword;