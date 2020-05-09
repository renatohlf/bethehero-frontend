import React, { useEffect, useCallback} from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import "./profile.css";
import api from "../../services/api";
import { useState } from 'react';

const Profile = () => {
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');

    const token = localStorage.getItem('token');
    
    const [incidents, setIncidents] = useState([]);

    const loadIncidents = useCallback(() => {
        api.get('profile', { headers: { Authorization: token }}).then((res) => {
           if(res && res.data) {
               setIncidents(res.data.results);
            }
        }).catch((err) => console.log('err: ' + err.response.data.error));
    }, [token]);
    

    useEffect(() => {
        loadIncidents();
    }, [loadIncidents]);


    const handleDeleteIncident = (id) => {
        api.delete(`incidents/${id}`, { headers: { Authorization: token}}).then((res) => {
            loadIncidents();
        }).catch((err) => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('ongName');
        localStorage.removeItem('ongId');
        localStorage.removeItem('token');
        history.push('/');
    };

    return <div className="profile__container">
        <header className={"profile__header"}>
            <img src={logo} alt="Be the Hero"/>
            <span>Welcome, {ongName ? ongName : 'anon'}</span>
            
            <Link className={"button"} to="/incidents/new">Register new case</Link>
            <button type={"button"} onClick={handleLogout}>
                <FiPower size={18} color={"#E02041"} />
            </button>
        </header>

        <div className="profile__content">
            <h1>Registered cases</h1>        
            <ul>
                { incidents && incidents.map(incident => 

                    <li key={incident._id}>
                        <strong>CASE:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('de', { style: 'currency', currency: 'EUR'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident._id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                )}
                
            </ul>
        </div>
  </div>;
}
 
export default Profile;