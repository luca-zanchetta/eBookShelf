import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';

function StoreListView(props) {
    const books = props.books;

    return(
        <div className="CenterStoreContainer" id='style-1'>
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