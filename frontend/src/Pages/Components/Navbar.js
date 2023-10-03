import '../../Css/Navbar-style.css'
import profile from '../../Icons/user.png';
import store from '../../Icons/purse.png';

function Navbar({OnNavigatorClick}) {
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
                <div className='ToggleEntry'>
                    <input type='radio' id="store" name="menu"></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="store">Book store</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="library" name="menu"></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="library">Book store</label>
                </div>
                <div className='ToggleEntry'>
                    <input type='radio' id="dsds" name="menu"></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="dsds">Book store</label>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Navbar;