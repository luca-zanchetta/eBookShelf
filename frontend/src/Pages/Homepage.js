import '../Css/Homepage-style.css'
import Navbar from './Components/Navbar';


function Homepage() {
    
    function Test() {
        console.log("ciao!");
    }

    return (
      <div className='HomeContainer'>
        <Navbar OnNavigatorClick={Test}></Navbar>
      </div>
    );
  }
  
export default Homepage;
  