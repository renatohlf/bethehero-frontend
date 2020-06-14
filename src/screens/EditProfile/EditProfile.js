import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Field, Form } from "react-final-form";
import api from "../../services/api";
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { routes } from './../../static/routes';
import { getAuthToken } from "../../utils/auth";

const EditProfile = () => { 
    const [ loading, setLoading ] = useState(false);
    const [ ong, setOng ] = useState({});

    const token = getAuthToken();

    useEffect(() => {
        setLoading(true);
        api.get('/ong', { headers: { Authorization: token }}).then((res) => {
            setOng(res.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Error: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 3000);
        })
    }, [token]);

    const handleEditProfile = (formValues) => {
        setLoading(true);
        api.patch('profile/edit', formValues, { headers: { Authorization: token }}).then((response) => {
            toast.success(`Profile successfully updated`, {
                position: toast.POSITION.BOTTOM_RIGHT
              }, 2000);

            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Error: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
           
        });
    };

    return <div className={"edit-profile__container"}>
            { loading && <LoadingSpinner /> }
            <div className="edit-profile__content">
                <section className="edit-profile__section">
                <img src={logo} alt="Be the Hero" />
                <div className={"title"}>
                    Edit Profile
                </div>
                <p className={"edit-profile__section__text"}>
                    Update your profile data.
                </p>
                <Link className={"back-link edit-profile__back-link"} to={routes.profile()}>
                    <FiArrowLeft size={16} color={"e02041"} />
                    Back to profile
                </Link>
                </section>
                <Form
                onSubmit={handleEditProfile}
                initialValues={ong}
                render={({ handleSubmit }) => (
                    <form className="edit-profile__form" onSubmit={handleSubmit}>
                        <Field
                            name="name"
                            component="input"
                            placeholder="ONG Name"
                            required={true}
                        />

                        <Field
                            name="whatsapp"
                            component="input"
                            type='number'
                            placeholder="Whatsapp"
                        />

                        <div className="edit-profile__form__group">
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

                        <div className="edit-profile__form__group">
                            <button className={"button"} type="submit">
                            Save
                            </button>
                        </div>
                    </form>
                )}
                />
            </div>
    </div>;
};


export default EditProfile;