import React, { useState } from "react";
import "./Register.scss";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Form, Field } from "react-final-form";
import api from "../../services/api";
import LoadingSpinner from '../../components/LoadingSpinner';

const Register = () => {

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = (formValues) => {
    setLoading(true);
    api.post('register', formValues).then((response) => {
      //TODO: Send confirmation email
      alert(`Thank you for your registration! your username is: ${response.data.ong.email}`);
      history.push('/');
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      alert('Operation not possible due an error. '); 
    });
  };

  return (
    <div className="register__container">
      { loading && <LoadingSpinner /> }
      <div className="register__content">
        <section className="register__section">
          <img src={logo} alt="Be the Hero" />
          <h1 className={"register__section__header"}>Registration</h1>
          <p className={"register__section__text"}>
            Sign up, login in the platform and help other people to find other
            cases of your ONG.
          </p>
          <Link className={"back-link register__back-link"} to="/">
            <FiArrowLeft size={16} color={"e02041"} /> I already have an account
          </Link>
        </section>

        <Form
          onSubmit={handleRegister}
          render={({ handleSubmit }) => (
            <form className="register__form" onSubmit={handleSubmit}>

              <Field
                name="name"
                component="input"
                placeholder="ONG Name"
                required={true}
              />
              
              <Field
                name="email"
                component="input"
                type='email'
                placeholder="Email"
                required={true}
              />

              <Field
                name="whatsapp"
                component="input"
                type='number'
                placeholder="Whatsapp"
              />

              <div className="register__form__group">
                <Field
                  name="city"
                  component="input"
                  placeholder="city"
                  required={true}
                />
                <Field
                  name="uf"
                  component="input"
                  placeholder="UF"
                  style={{ width: 80 }}
                  required={true}
                />
              </div>

              <Field
                name="password"
                component="input"
                type='password'
                placeholder="Password"
                required={true}
              />

              <button className={"button"} type="submit">
                Sign up
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Register;
