import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Field, Form } from "react-final-form";
import api from "../../services/api";
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const RegisterIncident = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const token = localStorage.getItem('token');

    const handleRegister = (formValues) => {
        setLoading(true);
        api.post('incidents', formValues, { headers: { Authorization: token }}).then((response) => {
            toast.success(`Incident successfuly registered!`, {
                position: toast.POSITION.BOTTOM_CENTER
              }, 2000);
            history.push('/profile');
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Ops: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_CENTER
            }, 5000);
           
        });
    };

    return (
        <div className="register-incident__container">
            { loading && <LoadingSpinner /> }
            <div className="register-incident__content">
                <section className="register-incident__section">
                <img src={logo} alt="Be the Hero" />
                <h1 className={"register-incident__section__header"}>
                    Register new case
                </h1>
                <p className={"register-incident__section__text"}>
                    Describe the case detailed to find a hero to solve it.
                </p>
                <Link className={"back-link register-incident__back-link"} to="/profile">
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
