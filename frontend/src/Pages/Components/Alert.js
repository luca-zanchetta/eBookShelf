import React from 'react';

import '../../Css/Alert.css'

function Alert(props) {

    return(
        <div className='Alert'>
            <div className='MessageBubble'>
                <h1>{props.message}</h1>
                <h2>{props.body}</h2>
                <div className='Buttons'>
                    <input type='button' id='cancel' value="Cancel" onClick={() => props.result(false)}></input>
                    <input type='button' id='confirm' value="Confirm" onClick={() => props.result(true)}></input>
                </div>
            </div>
        </div>
    )
}
export default Alert;