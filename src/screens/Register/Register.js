import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Form, Field } from "react-final-form";
import api from "../../services/api";
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { routes } from './../../static/routes';
const Register = () => {

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = (formValues) => {
    setLoading(true);
    api.post('signup', formValues).then((response) => {
      setLoading(false);
      toast.success(`Thank you for your registration! Check your email`, {
        position: toast.POSITION.BOTTOM_RIGHT
      }, 2000);
      history.push(routes.login());
      
    }).catch((err) => {
      setLoading(false);
      toast.error("Error: " + err.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT
      }, 5000);
      
    });
  };

  return (
    <div className="register__container">
      { loading && <LoadingSpinner /> }
      <div className="register__content">
        <section className="register__section">
          <img src={logo} alt="Be the Hero" />
          <div className={"title"}>Registration</div>
          <p className={"register__section__text"}>
            Sign up, login in the platform and help other people to find other
            cases of your ONG.
          </p>
          <Link className={"back-link register__back-link"} to={routes.login()}>
            <FiArrowLeft size={16} color={"e02041"} /> I already have an account
          </Link>
        </section>

        <Form
          onSubmit={handleRegister}
          render={({ handleSubmit }) => (
            <form className="register__form" onSubmit={handleSubmit}>

              <Field
                name="ongName"
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
                  placeholder="City"
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
