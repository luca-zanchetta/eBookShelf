import '../Css/Homepage-style.css'
import BookPreview from './Components/BookPreview';
import BookStore from './Components/BookStore';
import Navbar from './Components/Navbar';



function Homepage() {
    
    function Test() {
        console.log("ciao!");
    }

    return (
      <div className='HomeContainer'>
        <Navbar OnNavigatorClick={Test}></Navbar>
        <hr />
        <BookStore></BookStore>
        <BookPreview></BookPreview>
      </div>
    );
  }
  
export default Homepage;
  