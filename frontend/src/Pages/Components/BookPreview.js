import React from 'react';
import '../../Css/BookPreview-style.css'
import '../../Css/star-vote.css'
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import sample from '../../Icons/sample.jpg';
import axios from 'axios';
import { Screens } from '../Homepage';
import { HomepageEndpoint } from '../Homepage';


class BookPreview extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            book: null
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
        console.log(response)
        this.setState(response.data);
    }

    render() {
        return(
            <>
                 {this.state.book != null &&
                    <div className="RightContainer">
                        <h2>Book details</h2>
                        {this.state.book != null && <>   
                        <img src={this.state.book.URL == ""? sample:this.state.book.URL} id="book"></img>
                        <div className="BookInfo">
                            <h3>{this.state.book.title}</h3>
                            <h5>{this.state.book.authors}</h5>
                            <h5>Star vote da mettere</h5>
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
                        <input type="button" value="See more"></input>
                        </>}
                    </div>

                 }
                </>
        );
    }
}

export default BookPreview;