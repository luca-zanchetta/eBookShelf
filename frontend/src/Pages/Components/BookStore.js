import axios from 'axios';
import '../../Css/BookStore-style.css';
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
    const [category, setCategory] = useState('');
    const bookName = '';
    const [books, setBooks] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('buyBook', 'true');
    }, []);

    const handleKeyPress = async (event) => {
        if(event.keyCode === 13) {
            if(event.target.value !== '') {
                if(category === '') {
                    await axios.get(
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
                    setStatus(StoreScreens.ListView);
                }
                else if(category !== '') {
                    console.log('category: '+category)
                    await axios.get(
                        HomepageEndpoint + '/getCategoryBooksByName', {
                            params: {
                                name: event.target.value,
                                category: category,
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
                    setStatus(StoreScreens.ListView);
                }
            }
            else {
                setStatus(StoreScreens.Store);
            }
        }
    }

    function onCategoryClick(event){
        setCategory(event.currentTarget.id);

        axios.get(
            HomepageEndpoint + '/getBooksByCategory', {
                params: {
                    category: event.currentTarget.id,
                },
            }
        ).then(function (response){
            if(response.data.status === 201) {
                // No books for this category
            }
            else if(response.data.status === 200) {
                setBooks(response.data.books);
                setStatus(StoreScreens.ListView);
            }
        })
    }

    function onStoreClick() {
        setStatus(StoreScreens.Store);
        setCategory('');
    }

    return(
        <div className="StoreContainer">
            <div className="StoreTopBar">
            <h1 onClick={onStoreClick}>
                    Store
                </h1>
                <div className="SearchBar">
                    <input type="text" placeholder="Find a book..." id="bookName" defaultValue={bookName} onKeyDown={handleKeyPress}></input>
                </div>
            </div>
            {
                (Status === StoreScreens.Store &&  <StoreDefault onBookClick={props.OnBookClick} onCategoryClick= {onCategoryClick}></StoreDefault>)
                ||
                (Status === StoreScreens.ListView &&  <StoreListView currentCategory={category} books={books} onBookClick={props.OnBookClick}></StoreListView>)
            }
        </div>
    );
}

export default BookStore;