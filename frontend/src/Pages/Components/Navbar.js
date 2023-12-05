import '../../Css/Navbar-style.css'
import profile from '../../Icons/user.png';
import store from '../../Icons/purse.png';
import books from '../../Icons/books.png';
import del from '../../Icons/delete.png';
import logout from '../../Icons/logout.png';
import dashboard from '../../Icons/dashboard.png';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Screens } from '../Homepage';
import { HomepageEndpoint } from '../Homepage';
import Alert from './Alert';
import { Alerts } from './Alert';
const endpointGetNameByUsername = 'http://localhost:5000/getNameByUsername';



function Navbar({OnNavigatorClick}) {
    const loggedIn = localStorage.getItem('LoggedUser');
    const [currentDisplay,setDisplay] = useState(Screens.Store);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [show, SetShow] = useState(false);
    const [balance,SetBalance] = useState(0)
    const navigate = useNavigate();

    const show_data = useCallback(async(event) => {
        const response = await axios
        .get(endpointGetNameByUsername, {
            params: {
                username: loggedIn,
            },
        })
        .catch(function (error) {
          if (error.response) {
            // Print error data
            console.log("Data: " + error.response.data);
            console.log("Status: " + error.response.status);
            console.log("Headers: " + error.response.headers);
          }
        });

        if(response.data.status === 200) {
            setName(response.data.name);
            setSurname(response.data.surname);
        }
        else if(response.data.status === 404) {
            console.log(response.data.message);
        }
    }, [loggedIn]);

    const OnClick = event => {
        var display = 0
        if(event.currentTarget.id === 'store')
            display = Screens.Store
        else if(event.currentTarget.id === 'library')
            display = Screens.Library
        else
            display = Screens.Dashboard

            console.log(display)
        setDisplay(currentDisplay)
        OnNavigatorClick(display);
    }

    const handleLogout = async (event) => {
        event.preventDefault();
    
        const loggedIn = localStorage.getItem("LoggedUser");
        if (loggedIn) {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/login");
          window.location.replace(window.location.href);
        }
    }
    async function deleteAccountResut(res){
        SetShow(false);
        if(res) {
            //delete account confirmed
            try {
                const response = await axios
                  .post(HomepageEndpoint+'/deleteAccount', {
                    username : loggedIn,
                  });
                
                if(response.data.status === 200) {
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate("/login");
                    window.location.replace(window.location.href);
                }
              } 
              catch (error) {
                // Request failed
                console.log("[ERROR] Request failed: " + error);
              }

        }
    }

    useEffect(() => {
        show_data();

        axios.get(
            HomepageEndpoint + '/getBalance',{ params: { username: loggedIn}}
            
        ).then((response) =>
        {
            SetBalance(response.data.balance);
        })
        
    }, [loggedIn, show_data]);

    return(
        <div className='Container'>
            {
                show && <Alert message="WARNING!" body="Are you sure you want to delete your account?" type={Alerts.AskConfirmation} result={deleteAccountResut}></Alert>
            }
            <h1>
                E-BookShelf
            </h1>
            <div className='ProfileContainer'>
                <img src={profile} alt=''></img>
                <h2>
                    {name} {surname}
                </h2>
                <h4>
                    @{loggedIn}
                </h4>
                <h4>
                    Balance: {balance.toFixed(2)}$
                </h4>
            </div>
            <hr />
            <div className='ToggleMenu'>
            {/* =============== TOGGLE MENU ================== */}
                <div className='ToggleEntry'>
                    <input type='radio' id="store" name="menu" onClick={OnClick} defaultChecked = { Screens.Store === currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={store} alt=''></img>
                    </div>
                    <label for="store">Book store</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="library" name="menu"onClick={OnClick} defaultChecked = { Screens.Library === currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={books} alt=''></img>
                    </div>
                    <label for="library">My Library</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="dashboard" name="menu" onClick={OnClick} defaultChecked = { Screens.Dashboard === currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={dashboard} alt=''></img>
                    </div>
                    <label for="dashboard">Dashboard</label>
                </div>
            </div>
            <hr />
            {/* -=================buttons=====================*/}
            <div className='ToggleMenu'>
                <div className='ToggleEntry' onClick={() => SetShow(true)}>
                    <input type='button' id="settings" name="settings"></input>
                    <div className='ToggleIcon'>
                        <img src={del} alt=''></img>
                    </div>
                    <label for="settings" style={{fontSize:'.95vw'}}>Delete Account</label>
                </div>
                <div className='ToggleEntry' onClick={handleLogout}>
                    <input type='button' id="logout" name="logout"></input>
                    <div className='ToggleIcon'>
                        <img src={logout} alt=''></img>
                    </div>
                    <label for="logout">Logout</label>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;