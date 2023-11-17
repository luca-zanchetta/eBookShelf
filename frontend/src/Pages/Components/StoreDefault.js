import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';

import { HomepageEndpoint } from '../Homepage';
import axios from 'axios';
import { useEffect, useState } from 'react';

function StoreDefault(props) {
    var [popularBook,setPopularBooks] = useState([]);
    const [fiveCategories, setFiveCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [fiveURLs, setFiveURLs] = useState([]);
    const [allURLs, setAllURLs] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [viewAllOk, setViewAllOk] = useState(false);

    function toggleViewAll() {
        if(!viewAll && viewAllOk) {
            setViewAll(true);
        }
        else {
            setViewAll(false);
        }
    }

    useEffect(() =>
    {
        sessionStorage.setItem('buyBook', 'true');
        
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

        axios.get(
            HomepageEndpoint + '/getCategories'
        ).then(function (response) {
            if(response.data.status === 200) {
                setViewAllOk(true);
                setAllCategories(response.data.categories);
                setAllURLs(response.data.urls);
            }
            else {
                setViewAllOk(false);
                setAllCategories([]);
                setAllURLs([]);
            }
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
                {viewAll &&
                    <h3 onClick={toggleViewAll} style={{cursor: 'pointer'}}>View five</h3>
                }
                {!viewAll &&
                    <h3 onClick={toggleViewAll} style={{cursor: 'pointer'}}>View all</h3>
                }
            </div>
            {(!viewAll || !viewAllOk) &&
                <div className="BookCategoryList"> {
                    fiveCategories.map((category, index) => (
                        <div className="CategoryListEntry" id={category} onClick={props.onCategoryClick}>
                            <h3>{category}</h3>
                            <img src={fiveURLs[index] == ""? sample:fiveURLs[index]}></img>             
                        </div>
                    ))}
                </div>
            }
            {(viewAll && viewAllOk) &&
                <div className='ListCategoryContainer'> {
                allCategories.map((category, index) => (
                    <div className="CategoryListEntry" id={category} onClick={props.onCategoryClick}>
                        <h3>{category}</h3>
                        <img src={allURLs[index] == ""? sample:allURLs[index]}></img>
                    </div>
                ))}
                </div>
            }
        </div>
        </div>
    );
}

export default StoreDefault;