import '../../Css/Navbar-style.css'
import profile from '../../Icons/user.png';
import store from '../../Icons/purse.png';
import books from '../../Icons/books.png';
import settings from '../../Icons/settings.png';
import logout from '../../Icons/logout.png';
import dashboard from '../../Icons/dashboard.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screens } from '../Homepage';

const loggedIn = localStorage.getItem('LoggedUser')

function Navbar({OnNavigatorClick}) {
    const [currentDisplay,setDisplay] = useState(Screens.Store);
    const navigate = useNavigate();

    

    const OnClick = event => {
        var display = 0
        if(event.currentTarget.id == 'store')
            display = Screens.Store
        else if(event.currentTarget.id == 'library')
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

    return(
        <div className='Container'>
            <h1>
                E-BookShelf
            </h1>
            <div className='ProfileContainer'>
                <img src={profile}></img>
                <h2>
                    Nome Utente
                </h2>
                <h4>
                    @{loggedIn}
                </h4>
            </div>
            <hr />
            <div className='ToggleMenu'>
            {/* =============== TOGGLE MENU ================== */}
                <div className='ToggleEntry'>
                    <input type='radio' id="store" name="menu" onClick={OnClick} defaultChecked = { Screens.Store == currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="store">Book store</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="library" name="menu"onClick={OnClick} defaultChecked = { Screens.Library == currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={books}></img>
                    </div>
                    <label for="library">My Library</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="dashboard" name="menu" onClick={OnClick} defaultChecked = { Screens.Dashboard == currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={dashboard}></img>
                    </div>
                    <label for="dashboard">Dashboard</label>
                </div>
            </div>
            <hr />
            {/* -=================buttons=====================*/}
            <div className='ToggleMenu'>
                <div className='ToggleEntry'>
                    <input type='button' id="settings" name="settings"></input>
                    <div className='ToggleIcon'>
                        <img src={settings}></img>
                    </div>
                    <label for="settings">Settings</label>
                </div>
                <div className='ToggleEntry' onClick={handleLogout}>
                    <input type='button' id="logout" name="logout"></input>
                    <div className='ToggleIcon'>
                        <img src={logout}></img>
                    </div>
                    <label for="logout">Logout</label>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;