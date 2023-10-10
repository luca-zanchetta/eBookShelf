import React from 'react';
import '../../Css/BookPreview-style.css'
import '../../Css/star-vote.css'
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import sample from '../../Icons/sample.jpg';

class BookPreview extends React.Component {

    constructor(props){
        super(props)

        this.state = {

        }
    }

    SetBook(bookName){
        console.log(bookName);
    }

    render() {
        return(
            <div className="RightContainer">
                <h2>Book details</h2>
                <img src={sample} id="book"></img>
                <div className="BookInfo">
                    <h3> Lord of the rings</h3>
                    <h5> J.R.R. Tolkien</h5>
                    <h5>Star vote da mettere</h5>
                    <div className="BookRecap">
                        <div className="RecapEntry">
                            <h4>
                                144
                            </h4>
                            <h5>
                                Pages
                            </h5>
                        </div>
                        <hr />
                        <div className="RecapEntry">
                            <h4>
                                2019
                            </h4>
                            <h5>
                                Release
                            </h5>
                        </div>
                        <hr />
                        <div className="RecapEntry">
                            <h4>
                                7.6k
                            </h4>
                            <h5>
                                Readers
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="BookContent">
                    Some text description of the book here!
                </div>
                <input type="button" value="See more"></input>
            </div>
        );
    }
}

export default BookPreview;