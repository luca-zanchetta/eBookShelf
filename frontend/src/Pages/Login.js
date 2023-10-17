import '../Css/Login-style.css'
import show from '../Icons/show.png';
import hide from '../Icons/hide.png';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginResult = {
    correctField : 0,
    invalidField : 1,
    wrongContent : 2
}

function Login(){
    const navigate = useNavigate();
    
    const [showPs, SetShow] = useState(false);
    const [invalidPs, SetInvPs] = useState(LoginResult.correctField);
    const [invalidUs, SetInvUs] = useState(LoginResult.correctField);

    function ToggleShow(){
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            SetShow(true)
        } else {
            x.type = "password";
            SetShow(false)
        }
    }

    function SubmitLogin() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if(!username){
            SetInvUs(LoginResult.invalidField);
            return;
        }

        if(!password){
            SetInvPs(LoginResult.invalidField);
            return;
        }

    }


    return(
        <div className='LoginContainer'>
            <h1 className='Logo'>EBook-Shelf</h1>
            <div className="Background">
            </div>
                <div className="Card">
                    <div className='Title'>
                        <h1>Log in</h1>
                    </div>
                    <div className='InputForms'>
                        <div className='InputLabels'>
                            <h3>
                                username
                            </h3>
                            <h4>
                                Need an account?   <span id='signUp' onClick={() => navigate('/signUp')}>  Sign Up</span>
                            </h4>
                        </div>
                        {
                            ((invalidUs == LoginResult.invalidField || invalidUs == LoginResult.wrongContent)
                            && <input type='text' id='username' className='InvalidInput'></input>)
                            ||
                           ( invalidUs == LoginResult.correctField && <input type='text' id='username'></input>)
                        }
                        <div className='InputLabels'>
                            {invalidUs == LoginResult.invalidField && <h4 className="invalidContentMessage">Invalid content!</h4>}
                            {invalidUs == LoginResult.wrongContent && <h4 className="invalidContentMessage">Wrong username!</h4>}       
                        </div>
                    </div>
                    <div className='InputForms'>
                        <div className='InputLabels'>
                            <h3>
                                password
                            </h3>
                            <h4>
                                <span id='showPassword' onClick={ToggleShow}>
                                    {
                                        !showPs && <img src={show}></img>
                                        ||
                                        showPs && <img src={hide}></img>
                                    }
                                </span>
                                show
                            </h4>
                        </div>
                        {
                            ((invalidPs == LoginResult.invalidField || invalidPs == LoginResult.wrongContent)
                            && <input type='password' id='password' className='InvalidInput'></input>)
                            ||
                           ( invalidPs == LoginResult.correctField && <input type='password' id='password'></input>)
                        }
                        <div className='InputLabels'>
                            {invalidPs == LoginResult.invalidField && <h4 className="invalidContentMessage">Invalid content!</h4>}
                            {invalidPs == LoginResult.wrongContent &&<h4 className="invalidContentMessage">Wrong password!</h4>}
                        </div>
                    </div>
                    <input type='button' value="Login"  onClick={SubmitLogin}></input>
                </div>
        </div>
    )
}

export default Login;