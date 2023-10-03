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
                    <input type='radio' id="store"></input>
                    <div className='ToggleIcon'>
                        <img src={store}></img>
                    </div>
                    <label for="store">Book store</label>
                </div>
            </div>
        </div>
    );
}

export default Navbar;