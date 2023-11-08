import '../../Css/Dashboard-style.css'
import sample from '../../Icons/sample.jpg';

import upArrow from '../../Icons/down-arrow.png';
import downArrow from '../../Icons/up-arrow.png';
import book from '../../Icons/book-n.png'
import { HomepageEndpoint } from '../Homepage';
import axios from 'axios';

import { useState, useEffect } from 'react';

function Dashboard() {
    const [showMoneyCharge, setShowMoney] = useState(false);
    const [timeout, SetTimerId] = useState();
    const username = localStorage.getItem('LoggedUser');
    const [balance, setBalance] = useState(0);
    const [chargedMoney, setChargedMoney] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [transactions, setTransactions] = useState([])

    async function ChargeMoney() {
        if(!showMoneyCharge) {
            setShowMoney(true);
            clearTimeout(timeout);
            var _timeout = setTimeout(() => setShowMoney(false), 5000)
            SetTimerId(_timeout)
        }
        else {
            var amount = document.getElementById('money').value;

            try {
                const response = await axios
                  .post(HomepageEndpoint+'/addMoney', {
                    username,
                    amount,
                  });
        
                if(response.data.status === 200) {
                    sessionStorage.setItem('window', 'dashboard');
                    window.location.replace(window.location.href);
                }
                else {
                    alert(response.data.message);
                }
              } 
              catch (error) {
                // Request failed
                console.log("[ERROR] Request failed: " + error);
              }
        }
    }

    useEffect(() => {
        
        // Get current balance
        axios.get(
            HomepageEndpoint + '/getBalance',{ params: { username: username}}        
        ).then((response) => {
            if(response.data.status === 200) {
                setBalance(response.data.balance);
            }
            else {
                alert(response.data.message);
            }
        })

        axios.get(
            HomepageEndpoint + '/getTransactions',{ params: { username: username}}        
        ).then((response) => {
            if(response.data.status === 200) {
                setTransactions(response.data.t);
                console.log(response.data.t);
            }
            else {
                alert(response.data.message);
            }
        })

        // Get total charged money
        axios.get(
            HomepageEndpoint + '/getTotalChargedMoney',
            {params : {username : username} }
        ).then((response) => {
            if(response.data.status === 200 || response.data.status === 201) {
                setChargedMoney(response.data.amount);
            }
            else {
                alert(response.data.message);
            }
        })
        
        // Get total expenses
        axios.get(
            HomepageEndpoint + '/getTotalExpenses',
            {params : {username : username} }
        ).then((response) => {
            if(response.data.status === 200 || response.data.status === 201) {
                setExpenses(response.data.amount);
            }
            else {
                alert(response.data.message);
            }
        })
    }, []);
    
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
                            <h2 id="balance">{balance.toFixed(2)}$</h2>
                            <div className='Movements'>
                                <div className='Movement'>
                                    <img src={upArrow} id="entries"></img>
                                    <h3>
                                        {chargedMoney.toFixed(2)}$
                                    </h3>
                                </div>
                                <div className='Movement'>
                                    <img src={downArrow} id="expenses"></img>
                                    <h3>
                                        {expenses.toFixed(2)}$
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