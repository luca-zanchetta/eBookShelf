import '../../Css/Library-style.css'
import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';

function Library(props) {
    return(
    <div className="StoreContainer">
        <div className="StoreTopBar">
            <h1>
                My Library
            </h1>
            <div className="SearchBar">
                <input type="text" placeholder="Find a book" id="bookName"></input>
            </div>
        </div>  
        <div className="CenterStoreContainer" id='style-1'>
                <div className="ListContainer">
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>{props.currentCategory}</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                    <div className="BookListEntry">
                        <img src={sample}></img>
                        <h4>Lord of the Rings</h4>
                        <h5>J.R.R. Tolkien</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Library;