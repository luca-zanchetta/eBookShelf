import '../../Css/Dashboard-style.css'
import sample from '../../Icons/sample.jpg';

import upArrow from '../../Icons/down-arrow.png';
import downArrow from '../../Icons/up-arrow.png';
import book from '../../Icons/book-n.png'
import { HomepageEndpoint } from '../Homepage';
import axios from 'axios';

import { useState, useEffect } from 'react';
import Alert, { Alerts } from './Alert';

function Dashboard() {
    const [buyAlert,setBuyAlert] = useState(0)
    const [showMoneyCharge, setShowMoney] = useState(false)
    const [timeout, SetTimerId] = useState()
    const username = localStorage.getItem('LoggedUser')
    const [balance, setBalance] = useState(0)
    const [chargedMoney, setChargedMoney] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [sixTransactions, setSixTransactions] = useState([])
    const [transactions, setTransactions] = useState([])
    const [readBooks, setReadBooks] = useState(0)
    const [genres, setGenres] = useState(0)
    const [stats,SetStats] = useState([])
    const [suggBook,SetSuggBook] = useState([])

    const [viewAll, setViewAll] = useState(true)

    function toggleViewAll() {
        if(!viewAll) {
            setViewAll(true);
        }
        else {
            setViewAll(false);
        }
    }

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

    async function buttonClick(isbn) {
        try {
            const response = await axios
              .post(HomepageEndpoint+'/buyBook', {
                username,
                isbn,
              });
            
            setBuyAlert(response.data.status);
          } 
          catch (error) {
            // Request failed
            console.log("[ERROR] Request failed: " + error);
          }
    }

    useEffect(() => {
        sessionStorage.setItem('buyBook', 'true');
        
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
            HomepageEndpoint + '/getSixTransactions',{ params: { username: username}}        
        ).then((response) => {
            if(response.data.status === 200) {
                setSixTransactions(response.data.transactions);
            }
            else {
                alert(response.data.message);
            }
        })

        axios.get(
            HomepageEndpoint + '/getTransactions',{ params: { username: username}}        
        ).then((response) => {
            if(response.data.status === 200) {
                setTransactions(response.data.transactions);
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
        
        axios.get(
            HomepageEndpoint + '/getBoughtBooks',
            {params : {username : username} }
        ).then((response) => {
            if(response.data.status === 200 || response.data.status === 201) {
                setReadBooks(response.data.books.length);
                var _genres = []
                var _stats = {}
                response.data.books.forEach(element => {
                    if(!_genres.includes(element.categories))
                        _genres.push(element.categories)
                    if(!_stats[element.categories])
                        _stats[element.categories] = 1
                    else
                        _stats[element.categories]++
                });
                setGenres(_genres.length);

                var items = Object.keys(_stats).map(function(key) {
                    return [key, _stats[key]];
                  });
                  
                  // Sort the array based on the second element
                items.sort(function(first, second) {
                return second[1] - first[1];
                });                
                SetStats(items) 
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

        axios.get(
            HomepageEndpoint + '/getSuggestedBooks',
            {params: {
                username: username
            }}
        ).then((response) => {
            if(response.data.status === 200 || response.data.status === 201) {
                console.log(response.data.status)
                console.log(response.data.books)
                SetSuggBook(response.data.books);
            }
            else {
                alert(response.data.message);
            }
        })

    }, [username]);
    
    return(
        <div className="Dashboard">
                {
                    (buyAlert === 400 || buyAlert === 401) && <Alert message="Error!" body="Your account has insufficient funds to cover this transaction." type={Alerts.Confirm} result={(res) => setBuyAlert(0)}></Alert>
                }
                {
                    buyAlert === 501 && <Alert message="Error!" body="An unexpected error occured during the transaction! Retry later." type={Alerts.Confirm} result={(res) => setBuyAlert(0)}></Alert>
                }
                {
                    buyAlert === 200 && <Alert message="Success!" body="You have bought a new book! You will find the new book in your library." type={Alerts.Confirm} result={(res) => setBuyAlert(0)}></Alert>
                } 
                {
                    buyAlert === 402 && <Alert message="Error!" body="You already own this book!" type={Alerts.Confirm} result={(res) => setBuyAlert(0)}></Alert>
                }
           <div className='DashboardTopBar'>
                <h1>
                    Dashboard
                </h1>
           </div>
           <div className='PageCenter'>
                    <h2>Suggested books</h2>
                    <div className='BlockList'>
                        <div className='SuggestedBooks'>
                        {
                            suggBook.map( (value) => {
                                return(
                                    <div className='SuggestedBooksEntry'>
                                        <img src={value.URL === ""? sample:value.URL} className="SuggestedBookImage" alt=''></img>
                                        <div className='SuggestedWrapper'>
                                            <div className='SuggestedBooksEntryText'>
                                                <h3>{value.title}</h3>
                                                <h4>{value.authors}</h4>
                                                <div className='BookData'>
                                                    <div>Pages {value.num_pages}</div>
                                                    <div>Readers {value.ratings_count}</div>
                                                    <div>Rating {value.average_rating}</div>                                          
                                                </div> 
                                                
                                            </div>
                                        <input type="button" id='buy' value={"Buy for  $"+value.price} onClick={() => buttonClick(value.ISBN)}></input>                                        
                                        </div>
                                    </div>
                                )

                            })
                        }
        
                        </div>
                        <div className='CreditDisplay'>
                        <div>
                            <h2>Your balance</h2>
                            <h2 id="balance">{balance.toFixed(2)}$</h2>
                            <div className='Movements'>
                                <div className='Movement'>
                                    <img src={upArrow} id="entries" alt=''></img>
                                    <h3>
                                        {chargedMoney.toFixed(2)}$
                                    </h3>
                                </div>
                                <div className='Movement'>
                                    <img src={downArrow} id="expenses" alt=''></img>
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
                            {(transactions.length > 6 && viewAll) &&
                                <h4 onClick={toggleViewAll} style={{cursor: 'pointer'}}>View all</h4>
                            }
                            {(transactions.length > 6 && !viewAll) &&
                                <h4 onClick={toggleViewAll} style={{cursor: 'pointer'}}>View six</h4>
                            }
                        </div>
                        {transactions.length === 0 ? (
                            <h3 style={{marginTop: '10%'}}>You have no transaction yet.</h3>
                        ): (
                            (viewAll && sixTransactions.map((value) => {
                                return(
                                    <div className="TransactionHistoryEntry">
                                        {
                                            value.book ? <h4>{value.book}</h4> : <h4>Credit Deposit</h4>
                                        }
                                        <h4>{value.date}</h4>
                                        {
                                            value.amount > 0 && <h4 className="Plus">+{value.amount}$</h4>
                                        }
                                        {
                                            value.amount < 0 && <h4 className="Minus">{value.amount}$</h4>
                                        } 
                                    </div>
                                )
                            }))
                            ||
                            (!viewAll && transactions.map((value) => {
                                return(
                                    <div className="TransactionHistoryEntry">
                                        {
                                            value.book ? <h4>{value.book}</h4> : <h4>Credit Deposit</h4>
                                        }
                                        <h4>{value.date}</h4>
                                        {
                                            value.amount > 0 && <h4 className="Plus">+{value.amount}$</h4>
                                        }
                                        {
                                            value.amount < 0 && <h4 className="Minus">{value.amount}$</h4>
                                        } 
                                    </div>
                                )
                            }))
                        )}
                    </div>
                    <div className="ProfileRecap">
                        <h2>Your Stats</h2>
                        <div className="ProfileRecapLeft">
                            <div className="ProfileRecapGenres">
                            {stats.length === 0 ? (
                                <h3 style={{marginTop: '10%'}}>Your library is empty!</h3>
                            ) : (
                                stats.map((value) => {      
                                    var width = (value[1]/(stats[0])[1])*100
                                    return(
                                        <div className="ProfileRecapGenresEntry">
                                            <h4>{value[0]}</h4>
                                            <div className="ProgressBar">
                                                <div style={{width:width + '%'}}></div>
                                            </div>
                                            <h4>{value[1]}</h4>
                                        </div>
                                    )
                                })
                            )}
                            </div>
                        </div>
                        <div className="Stats">
                            <div className="StatsEntry">
                                <div className="StatsEntryImg">
                                    <img src={book} alt=''></img>
                                </div>
                                <div className="StatsData">
                                    <h4>Read books</h4>
                                    <h2>{readBooks}</h2>
                                </div>
                            </div>   
                            <div className="StatsEntry">
                                <div className="StatsEntryImg">
                                    <img src={book} alt=''></img>
                                </div>
                                <div className="StatsData">
                                    <h4>Different genres</h4>
                                    <h2>{genres}</h2>
                                </div>
                            </div>           
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Dashboard;