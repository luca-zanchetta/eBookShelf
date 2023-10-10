import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';

function StoreListView(props) {
    return(
        <div className="CenterStoreContainer">
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
    );
}

export default StoreListView;