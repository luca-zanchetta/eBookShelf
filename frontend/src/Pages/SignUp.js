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

function SignUp(){
    const navigate = useNavigate();

    const [showPs, SetShow] = useState(false);
    const [invalidPs, SetInvPs] = useState(LoginResult.correctField);
    const [invalidUs, SetInvUs] = useState(LoginResult.correctField);
    const [invalidName, SetInvName] = useState(LoginResult.correctField);
    const [invalidSurn, SetInvSurn] = useState(LoginResult.correctField);
    const [invalidCopyPs, SetInvCopyPs] = useState(LoginResult.correctField);

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
        var checkPassed = true
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var copyPassword = document.getElementById("copyPassword").value;
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;

        if(!username){
            SetInvUs(LoginResult.invalidField);
            checkPassed = false
        }

        if(!password || password.length <= 8){
            SetInvPs(LoginResult.invalidField);
            checkPassed = false
        }

        if(!copyPassword || copyPassword != password){
            SetInvPs(LoginResult.invalidField);
            checkPassed = false
        }

        if(!name){
            SetInvName(LoginResult.invalidField);
            checkPassed = false
        }

        if(!surname){
            SetInvSurn(LoginResult.invalidField);
            checkPassed = false
        }

        if(!checkPassed) return
    } 


    return(
        <div className='LoginContainer'>
            <h1 className='Logo'>EBook-Shelf</h1>
            <div className="Background">
            </div>
                <div className="Card">
                    <div className='Title'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className='InputForms'>
                        <div className='InputLabels'>
                            <h3>
                                username
                            </h3>
                            <h4>
                                already have an account?   <span id='signUp' onClick={() => navigate('/login')}>Sign in</span>
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
                                name
                            </h3>
                            
                        </div>
                        {
                            ((invalidName == LoginResult.invalidField || invalidName == LoginResult.wrongContent)
                            && <input type='text' id='name' className='InvalidInput'></input>)
                            ||
                           ( invalidName == LoginResult.correctField && <input type='text' id='name'></input>)
                        }
                        <div className='InputLabels'>
                            {invalidName == LoginResult.invalidField && <h4 className="invalidContentMessage">Invalid content!</h4>}
                        </div>
                    </div>
                    <div className='InputForms'>
                        <div className='InputLabels'>
                            <h3>
                                Surname
                            </h3>
                        </div>
                        {
                            ((invalidSurn == LoginResult.invalidField || invalidSurn == LoginResult.wrongContent)
                            && <input type='password' id='surname' className='InvalidInput'></input>)
                            ||
                           ( invalidSurn == LoginResult.correctField && <input type='text' id='surname'></input>)
                        }
                        <div className='InputLabels'>
                            {invalidSurn == LoginResult.invalidField && <h4 className="invalidContentMessage">Invalid content!</h4>}
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
                            {invalidPs == LoginResult.invalidField && <h4 className="invalidContentMessage">insert at least 8 characters!</h4>}
                            {invalidPs == LoginResult.wrongContent &&<h4 className="invalidContentMessage">Passwords are diffrent!</h4>}
                        </div>
                    </div>
                    <div className='InputForms'>
                        <div className='InputLabels'>
                            <h3>
                                confirm password
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
                            ((invalidCopyPs == LoginResult.invalidField || invalidCopyPs == LoginResult.wrongContent)
                            && <input type='password' id='password' className='InvalidInput'></input>)
                            ||
                           ( invalidCopyPs == LoginResult.correctField && <input type='password' id='copyPassword'></input>)
                        }
                        <div className='InputLabels'>
                            {invalidCopyPs == LoginResult.invalidField && <h4 className="invalidContentMessage">Invalid content!</h4>}
                            {invalidCopyPs == LoginResult.wrongContent &&<h4 className="invalidContentMessage">Passwords are diffrent!</h4>}
                        </div>
                    </div>
                    <input type='button' value="Login"  onClick={SubmitLogin}></input>
                </div>
        </div>
    )
}

export default SignUp;