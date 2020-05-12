import React from "react";
import { FiLogIn } from "react-icons/fi";
import './login.scss';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { Form, Field } from "react-final-form";

const Login = () => {

   const history = useHistory();
    
    const login = (values) => {
        
        api.post('login', { ...values }).then(
        (res) => {
           
            localStorage.setItem('ongId', res.data.ong._id);
            localStorage.setItem('ongName', res.data.ong.name);
            localStorage.setItem('token', res.data.token);
            history.push(`/profile`);
        })
        .catch((error) => {
            console.log(error.response.data.error);
            alert('An error occured: ' + error.response.data.error);
        });
        
    };
    
  return (
    <div className="login__container">
        <section className="login__section">
            <img src={logo} alt="Heroes" />

            <Form
                onSubmit={login}
                render={({ handleSubmit }) => (
                    <form className={"login__form"} onSubmit={handleSubmit}>
                        <h1 className={"login__form__header"}>Sign in now</h1>

                        <Field
                            name="email"
                            component="input"
                            placeholder="Username"
                        />

                        <Field
                            name="password"
                            component="input"
                            type="password"
                            placeholder="Password"
                        />

                        <button className={"button"} type="submit">Sign in</button>
   
                    </form>)
                    }
                />

                <Link className={"back-link"} to="/register">
                        <FiLogIn size={16} color={"e02041"} />
                        I don't have an account
                    </Link>
        </section>

        <img className={"login__logo"} src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Login;
