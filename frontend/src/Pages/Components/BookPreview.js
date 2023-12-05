import React from 'react';
import '../../Css/BookPreview-style.css'
import '../../Css/star-vote.css'
import sample from '../../Icons/sample.jpg';
import x from '../../Icons/x.png';
import axios from 'axios';
import { HomepageEndpoint } from '../Homepage';
import Alert, { Alerts } from './Alert';

const username = localStorage.getItem('LoggedUser');
class BookPreview extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            book: null,
            CloseDialog: props.CloseWindow,
            Alert:0
        }

    }

    FormatRating(rating) {
        var newRating

        if(rating > 1000)
            newRating = Math.round(rating/1000) + "k"

        if(rating > 1000000)
            newRating = Math.round(rating/1000000) + "M"

        return newRating
    }
    async SetBook(book){
        if(book == null){
            this.setState({book:null})
            return;
        }
        var response = await axios.get(
            HomepageEndpoint + '/getBookByISBN',{ params: { isbn: book}}
        )
        this.setState(response.data);
    }

    async Buy(isbn) {
        try {
            const response = await axios
              .post(HomepageEndpoint+'/buyBook', {
                username,
                isbn,
              });
            
            this.UpdateAlertState(response.data.status)
          } 
          catch (error) {
            // Request failed
            console.log("[ERROR] Request failed: " + error);
          }
    }

    UpdateAlertState(status) {
        this.setState({Alert:status})
    }

    PopUpConfirm = (result) => {
        if(result === 200) {
            sessionStorage.setItem('window', 'library');
            window.location.replace(window.location.href);
        }
        
        this.setState({Alert:0})
    }

    render() {
        return(
            <>
                {
                    (this.state.Alert === 400 || this.state.Alert === 401) && <Alert message="Error!" body="Your account has insufficient funds to cover this transaction." type={Alerts.Confirm} result={this.PopUpConfirm}></Alert>
                }
                {
                    this.state.Alert === 501 && <Alert message="Error!" body="An unexpected error occured during the transaction! Retry later." type={Alerts.Confirm} result={this.PopUpConfirm}></Alert>
                }
                {
                    this.state.Alert === 200 && <Alert message="Success!" body="You have bought a new book! You will find the new book in your library." type={Alerts.Confirm} result={this.PopUpConfirm}></Alert>
                } 
                {
                    this.state.Alert === 402 && <Alert message="Error!" body="You already own this book!" type={Alerts.Confirm} result={this.PopUpConfirm}></Alert>
                }
                 {this.state.book != null &&
                    <div className="RightContainer">
                        <img src={x} id="xicon" onClick={this.state.CloseDialog} alt=''></img>
                        <h2>Book details</h2>
                        {this.state.book != null && <>   
                        <img src={this.state.book.URL === ""? sample:this.state.book.URL} id="book" alt=''></img>
                        <div className="BookInfo">
                            <h3>{this.state.book.title}</h3>
                            <h5>{this.state.book.authors}</h5>
                            <div className="BookRecap">
                                <div className="RecapEntry">
                                    <h4>
                                        {this.state.book.num_pages}
                                    </h4>
                                    <h5>
                                        Pages
                                    </h5>
                                </div>
                                <hr />
                                <div className="RecapEntry">
                                    <h4>
                                    {this.state.book.published_year}
                                    </h4>
                                    <h5>
                                        Release
                                    </h5>
                                </div>
                                <hr />
                                <div className="RecapEntry">
                                    <h4>
                                    {this.FormatRating(this.state.book.ratings_count)}
                                    </h4>
                                    <h5>
                                        Readers
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="BookContent">
                            {this.state.book.description}
                        </div>
                        {sessionStorage.getItem('buyBook') !== '' &&
                            <input type="button" id='buy' value={"Buy for " + this.state.book.price +"$"} onClick={() => this.Buy(this.state.book.ISBN)}></input>
                        }
                        </>}
                    </div>

                 }
                </>
        );
    }
}

export default BookPreview;