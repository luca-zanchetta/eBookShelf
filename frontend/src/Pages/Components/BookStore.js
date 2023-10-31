import axios from 'axios';
import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';
import StoreDefault from './StoreDefault';
import StoreListView from './StoreListView';
import { useState, useEffect } from 'react';
import { HomepageEndpoint } from '../Homepage';

const StoreScreens = {
	Store: 0,
	ListView: 1,
}

function BookStore(props) {
    var [Status,setStatus] = useState(StoreScreens.Store);
    var [category, setCategory] = useState("");
    const [bookName, setBookName] = useState('');
    const [books, setBooks] = useState([]);

    const handleKeyPress = (event) => {
        if(event.target.value !== '') {
            setStatus(StoreScreens.ListView);
            axios.get(
                HomepageEndpoint + '/getAllBooksByName', {
                    params: {
                        name: event.target.value,
                    },
                }
            ).then(function (response) {
                if(response.data.status === 201) {
                    // Nessun libro
                    setBooks([]);
                }
                else if(response.data.status === 200) {
                    // ok
                    setBooks(response.data.books);
                }
            })
        }
        else {
            setStatus(StoreScreens.Store);
        }
    }

    function SearchForBook(event) {
        //should fetch the server for a list of books
        if (event.keyCode === 13) {
            var bookName = document.getElementById("bookName").value
            setStatus(StoreScreens.ListView)
        }
    }

    function onCategoryClick(event){
        console.log(event.currentTarget.id)
    }

    return(
        <div className="StoreContainer">
            <div className="StoreTopBar">
            <h1 onClick={ () => setStatus(StoreScreens.Store)}>
                    Store
                </h1>
                <div className="SearchBar">
                    <input type="text" placeholder="Find a book..." id="bookName" defaultValue={bookName} onChange={handleKeyPress}></input>
                </div>
            </div>
            {
                Status == StoreScreens.Store &&  <StoreDefault onBookClick={props.OnBookClick} onCategoryClick= {onCategoryClick}></StoreDefault>
                ||
                Status == StoreScreens.ListView &&  <StoreListView currentCategory={category} books={books}></StoreListView>
            }
        </div>
    );
}

export default BookStore;