import '../../Css/Dashboard-style.css'
import sample from '../../Icons/sample.jpg';

import upArrow from '../../Icons/down-arrow.png';
import downArrow from '../../Icons/up-arrow.png';
import book from '../../Icons/book-n.png'


import { useState } from 'react';
function Dashboard() {
    const [showMoneyCharge, setShowMoney] = useState(false);
    const [timeout, SetTimerId] = useState();

    function ChargeMoney(){
        if(!showMoneyCharge){
            setShowMoney(true);
            clearTimeout(timeout);
            var _timeout = setTimeout(() => setShowMoney(false), 5000)
            SetTimerId(_timeout)
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
                            showMoneyCharge && <input type='text' id="money" onChange={() =>{clearTimeout(timeout); SetTimerId(setTimeout(() => setShowMoney(false), 5000))} }></input>
                        }
                            
                        <input type='button' value="Charge Money" onClick={ChargeMoney}></input>
                        </div>
                    </div>
                </div>
                <div className="PageBottom">
                    <div className="TransactionHistory">
                        <div className="TransactionHistoryTop">
                            <h2>Recent Transactions</h2>
                            <h4>view all</h4>
                        </div>
                        <div className="TransactionHistoryEntry">
                            <h4>The lord of the rings</h4>
                            <h4>12/10/2023</h4>
                            <h4 className="Minus">-200</h4>
                        </div>
                        <div className="TransactionHistoryEntry">
                            <h4>Account recharge</h4>
                            <h4>12/10/2023</h4>
                            <h4 className="Plus">+200</h4>
                        </div>
                    </div>
                    <div className="ProfileRecap">
                        <div className="ProfileRecapLeft">
                            <h2>Your Stats</h2>
                            <div className="ProfileRecapGenres">
                                <div className="ProfileRecapGenresEntry">
                                    <h4>Fantasy</h4>
                                    <div className="ProgressBar">
                                        <div style={{width:'100%'}}></div>
                                    </div>
                                    <h4>44 books</h4>
                                </div>
                                <div className="ProfileRecapGenresEntry">
                                    <h4>Fantasy</h4>
                                    <div className="ProgressBar">
                                        <div style={{width:'25%'}}></div>
                                    </div>
                                    <h4>44 books</h4>
                                </div>
                                <div className="ProfileRecapGenresEntry">
                                    <h4>Fantasy</h4>
                                    <div className="ProgressBar">
                                        <div style={{width:'20%'}}></div>
                                    </div>
                                    <h4>44 books</h4>
                                </div>
                            </div>
                        </div>
                        <div className="Stats">
                            <div className="StatsEntry">
                                <div className="StatsEntryImg">
                                    <img src={book}></img>
                                </div>
                                <div className="StatsData">
                                    <h4>Read books</h4>
                                    <h2>44</h2>
                                </div>
                            </div>   
                            <div className="StatsEntry">
                                <div className="StatsEntryImg">
                                    <img src={book}></img>
                                </div>
                                <div className="StatsData">
                                    <h4>Different genres</h4>
                                    <h2>7</h2>
                                </div>
                            </div>           
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Dashboard;