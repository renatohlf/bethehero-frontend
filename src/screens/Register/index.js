import React from "react";
import "./register.css";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Form, Field } from "react-final-form";
import api from "../../services/api";

const Register = () => {

  const history = useHistory();

  const handleRegister = (formValues) => {
    
    api.post('ongs', formValues).then((response) => {
      alert(`Sucess! here is your access id: ${response.data.id}`);
      history.push('/');
    }).catch((err) => {
      console.log(err)
      alert('Operation not possible due an error. '); 
    });
  };

  return (
    <div className="register__container">
      <div className="register__content">
        <section className="register__section">
          <img src={logo} alt="Be the Hero" />
          <h1 className={"register__section__header"}>Registration</h1>
          <p className={"register__section__text"}>
            Sign up, login in the platform and help other people to find other
            cases of your ONG.
          </p>
          <Link className={"back-link"} to="/">
            <FiArrowLeft size={16} color={"e02041"} />I don't have an account
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
              />
              
              <Field
                name="email"
                component="input"
                type='email'
                placeholder="Email"
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
                />
                <Field
                  name="uf"
                  component="input"
                  placeholder="UF"
                  style={{ width: 80 }}
                />
              </div>

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
