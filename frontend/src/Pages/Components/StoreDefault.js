import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';

import { HomepageEndpoint } from '../Homepage';
import axios from 'axios';
import { useEffect, useState } from 'react';

function StoreDefault(props) {
    var [popularBook,setPopularBooks] = useState([])
    const [fiveCategories, setFiveCategories] = useState([])
    const [fiveURLs, setFiveURLs] = useState([])

    useEffect(() =>
    {
        axios.get(
            HomepageEndpoint + '/getPopularBooks'
        ).then(function (response) {
            setPopularBooks(response.data.books);
        })

        axios.get(
            HomepageEndpoint + '/getFirstCategories'
        ).then(function (response) {
            setFiveCategories(response.data.categories);
            setFiveURLs(response.data.urls);
        })
    }
    ,[])

    return(
    <div className="CenterStoreContainer">
        <div className="PopularContainer">
            <div className="PopularCategoryTopBar">
                <h2>Popular Now</h2>
            </div>
            <div className="BookCategoryList">
                {
                    popularBook.map((book) => (
                        <div className="BookListEntry" id={book.ISBN} onClick={props.onBookClick}>
                            <img src={book.URL == ""? sample:book.URL}></img>
                            <h4>{book.title}</h4>
                            <h5>{book.authors}</h5>
                        </div>
                    ))
                }              
            </div>
        </div>
        <div className="CategoryContainer">
            <div className="PopularCategoryTopBar">
                <h2>Book Categories</h2>
                <h3>View all</h3>
            </div>
            <div className="BookCategoryList">
                {
                    fiveCategories.map((category, index) => (
                        <div className="CategoryListEntry" id={category} onClick={props.onCategoryClick}>
                            <h3>{category}</h3>
                            <img src={fiveURLs[index]}></img>             
                        </div>
                    ))
                }
                {/* <div className="CategoryListEntry" id='Fantasy' onClick={props.onCategoryClick}>
                    <h3>Fantasy</h3>
                    <img src={sample}></img>             
                </div>
                <div className="CategoryListEntry" id='Sci-fi' onClick={props.onCategoryClick}>
                    <h3>Sci-fi</h3>
                    <img src={sample}></img>             
                </div> */}
            </div>
        </div>
        </div>
    );
}

export default StoreDefault;