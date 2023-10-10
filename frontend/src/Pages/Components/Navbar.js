import '../../Css/Navbar-style.css'
import profile from '../../Icons/user.png';
import store from '../../Icons/purse.png';
import books from '../../Icons/books.png';
import settings from '../../Icons/settings.png';
import logout from '../../Icons/logout.png';
import React, { useState } from 'react';

function Navbar({OnNavigatorClick}) {
    const [currentDisplay,setDisplay] = useState(1);
    const OnClick = event => {
        if(event.currentTarget.id == 'store')
            setDisplay(1)
        else
            setDisplay(2)

        OnNavigatorClick(currentDisplay);
      };

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
                    @nomeUtente
                </h4>
            </div>
            <hr />
            <div className='ToggleMenu'>
            {/* =============== TOGGLE MENU ================== */}
                <div className='ToggleEntry'>
                    <input type='radio' id="store" name="menu" onClick={OnClick} checked = { 1 == currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="store">Book store</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="library" name="menu"onClick={OnClick} checked = { 2 == currentDisplay }></input>
                    <div className='ToggleIcon'>
                        <img src={books}></img>
                    </div>
                    <label for="library">My Library</label>
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
                <div className='ToggleEntry'>
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