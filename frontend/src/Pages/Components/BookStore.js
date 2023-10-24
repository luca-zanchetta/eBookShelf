import axios from 'axios';
import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';
import StoreDefault from './StoreDefault';
import StoreListView from './StoreListView';
import { useState, useEffect } from 'react';

const StoreScreens = {
	Store: 0,
	ListView: 1,
}

function BookStore(props) {
    
    var [Status,setStatus] = useState(StoreScreens.Store)
    var [category, setCategory] = useState("")



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
                    <input type="text" placeholder="Find a book" id="bookName" onKeyDown={SearchForBook}></input>
                </div>
            </div>
            {
                Status == StoreScreens.Store &&  <StoreDefault onBookClick={props.OnBookClick} onCategoryClick= {onCategoryClick}></StoreDefault>
                ||
                Status == StoreScreens.ListView &&  <StoreListView currentCategory={category}></StoreListView>
            }
        </div>
    );
}

export default BookStore;