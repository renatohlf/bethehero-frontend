import React, { useEffect,useState, useCallback} from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { FiPower, FiTrash2, FiMenu, FiPlus } from 'react-icons/fi';
import api from "../../services/api";
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import NavBar from '../../components/NavBar/NavBar';
import NavItem from '../../components/NavBar/NavItem/NavItem';
import DropdownItem from '../../components/DropdownMenu/DropdownItem/DropdownItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Profile = () => {
    
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');

    const token = localStorage.getItem('token');
    
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadIncidents = useCallback(() => {
        setLoading(true);
        api.get('profile', { headers: { Authorization: token }}).then((res) => {
           if(res && res.data) {
               setIncidents(res.data.results);
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Ops: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
        });
    }, [token]);
    

    useEffect(() => {
        loadIncidents();
    }, [loadIncidents]);


    const handleDeleteIncident = (id) => {
        api.delete(`incidents/${id}`, { headers: { Authorization: token}}).then((res) => {
            loadIncidents();
            toast.success("Successfuly removed", {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 2000);
        }).catch((err) => {
            toast.error("Ops: " + err.response.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT
            }, 5000);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('ongName');
        localStorage.removeItem('ongId');
        localStorage.removeItem('token');
        history.push('/');
    };

    return <div className="profile__container">
         { loading && <LoadingSpinner /> }
        <header className={"profile__header"}>
            <img className="profile__logo" src={logo} alt="Be the Hero"/>
            <span>Welcome, {ongName ? ongName : 'anon'}</span>

            <NavBar>
                {/* <NavItem to={'/incidents/new'} icon={<FiUser size={18} color={"#e02041"} />}></NavItem>  */}
                <NavItem icon={<FiMenu size={25} color={'#e02041'} />} isDropdownMenu={true}>
                    <DropdownMenu>
                        <DropdownItem leftIcon={<FiPlus size={18} color={"#FFF"} />} to={'/incidents/new'}>New case</DropdownItem>
                        <DropdownItem leftIcon={<FiPower size={18} color={"#FFF"} />} onClick={handleLogout}>Log out</DropdownItem>
                    </DropdownMenu>
                </NavItem>
            </NavBar>
        </header>

        <div className="profile__content">
            <h1>Registered cases</h1>        
            { incidents.length === 0 && <div className="profile__empty text-muted"> You didn't register any new case yet. Click <Link to={'/incidents/new'}>here</Link>  to register </div>}
            <ul>    
                { incidents && incidents.map(incident => 

                    <li key={incident._id}>
                        <strong>Case</strong>
                        <p>{incident.title}</p>

                        <strong>Description</strong>
                        <p>{incident.description}</p>

                        <strong>Value</strong>
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