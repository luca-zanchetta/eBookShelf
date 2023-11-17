import '../../Css/Library-style.css'
import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HomepageEndpoint } from '../Homepage';

function Library(props) {
    const username = localStorage.getItem('LoggedUser');
    const [boughtBooks, setBoughtBooks] = useState([]);
    const [bookName, setBookName] = useState('');

    useEffect(() =>
    {
        axios.get(
            HomepageEndpoint + '/getBoughtBooks', {
                params: {
                    username: username,
                },
            }
        ).then(function (response) {
            if(response.data.status === 201) {
                // Nessun libro
                setBoughtBooks([]);
            }
            else if(response.data.status === 500) {
                // Internal server error
                alert(response.data.message);
            }
            else if(response.data.status === 200) {
                // ok
                setBoughtBooks(response.data.books);
            }
        })

        sessionStorage.setItem('buyBook', '');
    }
    ,[])

    const handleKeyPress = (event) => {
        axios.get(
            HomepageEndpoint + '/getBoughtBooksByName', {
                params: {
                    username: username,
                    name: event.target.value,
                },
            }
        ).then(function (response) {
            if(response.data.status === 201) {
                // Nessun libro
                setBoughtBooks([]);
            }
            else if(response.data.status === 500) {
                // Internal server error
                alert(response.data.message);
            }
            else if(response.data.status === 200) {
                // ok
                setBoughtBooks(response.data.books);
            }
        })
    }

    return(
    <div className="StoreContainer">
        <div className="StoreTopBar">
            <h1>
                My Library
            </h1>
            <div className="SearchBar">
                <input type="text" placeholder="Find a book..." id="bookName" defaultValue={bookName} onChange={handleKeyPress}></input>
            </div>
        </div>  
        <div className="CenterStoreContainer" id='style-1'>
            {boughtBooks.length === 0 ? (
                    <h3>Your library is empty.</h3>
                ) : (
                    <div className="ListContainer">
                        {boughtBooks.map((book) => (
                            <div className="BookListEntry" id={book.ISBN} onClick={props.OnBookClick}>
                                <img src={book.URL === "" ? sample : book.URL} alt={book.title}></img>
                                <h4>{book.title}</h4>
                                <h5>{book.authors}</h5>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    </div>
    )
}

export default Library;