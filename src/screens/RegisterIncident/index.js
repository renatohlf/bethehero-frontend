import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./registerIncident.scss";
import { Field, Form } from "react-final-form";
import api from "../../services/api";

const RegisterIncident = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    const handleRegister = (formValues) => {

        api.post('incidents', formValues, { headers: { Authorization: token }}).then((response) => {
            alert(`Incident sucessfuly registered!`);
            history.push('/profile');
        }).catch((err) => {
            console.log(err.response.data.error)
            alert('Operation not possible due an error. '+ err.response.data.error); 
        });
    };

    return (
        <div className="register-incident__container">
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
                <Field name="title" component="input" placeholder="Title" />

                <Field
                    name="description"
                    component="textarea"
                    placeholder="Description"
                    style={{ height: 180 }}
                />

                <Field
                    name="value"
                    component="input"
                    type="number"
                    placeholder="Value"
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
