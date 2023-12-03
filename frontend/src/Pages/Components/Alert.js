import React from 'react';

import '../../Css/Alert.css'

export const Alerts = {
	AskConfirmation: 0,
	Confirm: 1,
}

function Alert(props) {

    return(
        <div className='Alert'>
            <div className='MessageBubble'>
                <h1>{props.message}</h1>
                <h2>{props.body}</h2>
                <div className='Buttons'>
                {props.type == Alerts.AskConfirmation 
                && 
                <>
                    <input type='button' id='cancel' value="Cancel" onClick={() => props.result(false)}></input>
                    <input type='button' id='confirm' value="Confirm" onClick={() => props.result(true)}></input>
                </>}
                {props.type == Alerts.Confirm &&  <input type='button' id='cancel' value="Confirm" onClick={() => props.result(true)}></input>}
                </div>
            </div>
        </div>
    )
}
export default Alert;