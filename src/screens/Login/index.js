import React from "react";
import { FiLogIn } from "react-icons/fi";
import './login.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useState } from "react";

const Login = () => {
    const [id, setId] = useState();
   const history = useHistory();
    
    const login = (e) => {
        e.preventDefault();
        api.post('login', { id }).then((res) => {
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);
            history.push(`/profile`);
        }).catch((err) => {
            console.log(err);
            alert('An error occured');
        });
        
    };
    
  return (
    <div className="login__container">
        <section className="login__section">
            <img src={logo} alt="Heroes" />

            <form className={"login__form"} onSubmit={login}>
                <h1 className={"login__form__header"}>Sign in now</h1>

                <input placeholder="Your ID" onChange={(e) => setId(e.target.value)} type="text"/>
                <button className={"button"} type="submit">Sign in</button>

            
                <Link className={"back-link"} to="/register">
                    <FiLogIn size={16} color={"e02041"} />
                    I don't have an account
                </Link>
            </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Login;
