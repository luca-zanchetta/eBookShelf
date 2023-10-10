import '../../Css/BookStore-style.css'
import sample from '../../Icons/sample.jpg';


function StoreDefault(props) {
    return(
    <div className="CenterStoreContainer">
        <div className="PopularContainer">
            <div className="PopularCategoryTopBar">
                <h2>Popular Now</h2>
                <h3>View all</h3>
            </div>
            <div className="BookCategoryList">
                <div className="BookListEntry" id="idOfTheBook" onClick={props.onBookClick}>
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
        <div className="CategoryContainer">
            <div className="PopularCategoryTopBar">
                <h2>Book Categories</h2>
                <h3>View all</h3>
            </div>
            <div className="BookCategoryList">
                <div className="CategoryListEntry" id='Drama' onClick={props.onCategoryClick}>
                    <h3>Drama</h3>
                    <img src={sample}></img>             
                </div>
                <div className="CategoryListEntry" id='Fantasy' onClick={props.onCategoryClick}>
                    <h3>Fantasy</h3>
                    <img src={sample}></img>             
                </div>
                <div className="CategoryListEntry" id='Sci-fi' onClick={props.onCategoryClick}>
                    <h3>Sci-fi</h3>
                    <img src={sample}></img>             
                </div>
            </div>
        </div>
        </div>
    );
}

export default StoreDefault;