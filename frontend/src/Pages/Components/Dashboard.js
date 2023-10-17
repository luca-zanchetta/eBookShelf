import '../../Css/Dashboard-style.css'
import sample from '../../Icons/sample.jpg';

import upArrow from '../../Icons/down-arrow.png';
import downArrow from '../../Icons/up-arrow.png';
import right from '../../Icons/next.png'
import { useState } from 'react';
function Dashboard() {
    var timeout
    const [showMoneyCharge, setShowMoney] = useState(false);
    function ChargeMoney(){
        if(!showMoneyCharge){
            setShowMoney(true);
            clearTimeout(timeout)
            timeout = setTimeout(() => setShowMoney(false), 10000)
        }else{

        }
        
    }
    
    return(
        <div className="Dashboard">
           <div className='DashboardTopBar'>
                <h1>
                    Dashboard
                </h1>
           </div>
           <div className='PageCenter'>
                    <h2>Suggested books</h2>
                    <div className='BlockList'>
                        <div className='SuggestedBooks'>
                            <div className='SuggestedBooksEntry'>
                                <img src={sample} className="SuggestedBookImage"></img>
                                <div className='SuggestedBooksEntryText'>
                                    <h3>Book name</h3>
                                    <h4>Book name</h4>
                                    <div className='BookData'>
                                        <div>Pages </div>
                                        <div>Readers </div>
                                        <div>Rating </div>
                                    </div>
                                </div>
                            </div>
                            <div className='SuggestedBooksEntry'>
                                <img src={sample} className="SuggestedBookImage"></img>
                                <div className='SuggestedBooksEntryText'>
                                    <h3>Book name</h3>
                                    <h4>Book name</h4>
                                    <div className='BookData'>
                                        <div>Pages </div>
                                        <div>Readers </div>
                                        <div>Rating </div>
                                    </div>
                                </div>
                            </div>
                            <div className='SuggestedBooksEntry'>
                                <img src={sample} className="SuggestedBookImage"></img>
                                <div className='SuggestedBooksEntryText'>
                                    <h3>Book name</h3>
                                    <h4>Book name</h4>
                                    <div className='BookData'>
                                        <div>Pages </div>
                                        <div>Readers </div>
                                        <div>Rating </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className='CreditDisplay'>
                        <div>
                            <h2>Your balance</h2>
                            <h2 id="balance">22$</h2>
                            <div className='Movements'>
                                <div className='Movement'>
                                    <img src={upArrow} id="entries"></img>
                                    <h3>
                                        100$
                                    </h3>
                                </div>
                                <div className='Movement'>
                                    <img src={downArrow} id="expenses"></img>
                                    <h3>
                                        100$
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {
                            showMoneyCharge && <input type='text' id="money" onChange={() => {clearTimeout(timeout); timeout = setTimeout(() => setShowMoney(false), 10000)}}></input>
                        }
                            
                        <input type='button' value="Charge Money" onClick={ChargeMoney}></input>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Dashboard;