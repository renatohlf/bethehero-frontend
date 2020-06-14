import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Field, Form } from "react-final-form";
import api from "../../services/api";
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { routes } from './../../static/routes';
import { getAuthToken } from "../../utils/auth";

const RegisterIncident = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const token = getAuthToken();

    const handleRegister = (formValues) => {
        setLoading(true);
        api.post('incidents', formValues, { headers: { Authorization: token }}).then((response) => {
            toast.success(`Incident successfully registered!`, {
                position: toast.POSITION.BOTTOM_RIGHT
              }, 2000);
            history.push(routes.profile());
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Error: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
           
        });
    };

    return (
        <div className="register-incident__container">
            { loading && <LoadingSpinner /> }
            <div className="register-incident__content">
                <section className="register-incident__section">
                <img src={logo} alt="Be the Hero" />
                <div className={"title"}>
                    Register new case
                </div>
                <p className={"register-incident__section__text"}>
                    Describe the case detailed to find a hero to solve it.
                </p>
                <Link className={"back-link register-incident__back-link"} to={routes.profile()}>
                    <FiArrowLeft size={16} color={"e02041"} />
                    Back to profile
                </Link>
                </section>
                <Form
                onSubmit={handleRegister}
                render={({ handleSubmit }) => (
                    <form className="register-incident__form" onSubmit={handleSubmit}>
                    <Field 
                        name="title" 
                        component="input" 
                        placeholder="Title"
                        required={true}
                        validateOnBlur={true}
                    />

                    <Field
                        name="description"
                        component="textarea"
                        placeholder="Description"
                        style={{ height: 180 }}
                        required={true}
                    />

                    <Field
                        name="value"
                        component="input"
                        type="number"
                        placeholder="Value"
                        required={true}
                    />

                    <div className="register-incident__form__group">
                        <button className={"button"} type="submit">
                        Register
                        </button>
                    </div>
                    </form>
                )}
                />
            </div>
        </div>
    );
};

export default RegisterIncident;
