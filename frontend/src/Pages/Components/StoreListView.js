import { useState } from 'react';
import '../../Css/BookStore-style.css'
import backIcon from '../../Icons/back.png';
import sample from '../../Icons/sample.jpg';

const StoreScreens = {
	Store: 0,
	ListView: 1,
}

function StoreListView(props) {
    var [Status,setStatus] = useState(StoreScreens.ListView);
    const [books, setBooks] = useState(props.books);
    const category = props.currentCategory;
    const [back, setBack] = useState(true);

    function backClick() {
        setStatus(StoreScreens.Store);
        setBack(false);
        setBooks([]);
        window.location.reload(window.location.href);
    }

    return(
        <div className="CenterStoreContainer" id='style-1'>
            {back && 
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{alignContent:'start'}}>
                        <input type='image' src={backIcon} alt='back' style={{width:'20%', marginRight: '70%'}} onClick={backClick}></input>
                    </div>
                    <div style={{alignContent:'center'}}>
                        <h1>Category: {category}</h1>
                    </div>
                </div>
            }
            {books.length === 0 ? (
                    <h3>No book found!</h3>
                ) : (
                    <div className="ListContainer">
                        {books.map((book) => (
                            <div className="BookListEntry" id={book.ISBN} onClick={props.onBookClick}>
                                <img src={book.URL === "" ? sample : book.URL} alt={book.title}></img>
                                <h4>{book.title}</h4>
                                <h5>{book.authors}</h5>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default StoreListView;