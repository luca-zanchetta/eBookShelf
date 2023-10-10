import '../Css/Homepage-style.css'
import BookPreview from './Components/BookPreview';
import BookStore from './Components/BookStore';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import React from 'react';

const Screens = {
	Store: 0,
	Library: 1,
}


function Homepage() {
    var currentDisplayingBook = null;
    var [currentScreen,changeState] = useState(Screens.Store);
    var ref = React.createRef()

    //page manager
    function ChangeWindow(page) {
        //page continene l'id dei componenti del toggle menu
        switch (page) {
          case 'library':
            //code to switch to  library
            changeState(Screens.Library)
            break;
          case 'store':
            //code to switch to store 
            changeState(Screens.Store)
            break;
          default:
            break;
        }
    }

    //Book overview manager
    function OnBookClicked(event){
      ref.current.SetBook(event.currentTarget.id)
    }

    return (
      <div className='HomeContainer'>
        <Navbar OnNavigatorClick={ChangeWindow}></Navbar>
        <hr />
        <BookStore OnBookClick={OnBookClicked} currentScreen={currentScreen}></BookStore>
        <BookPreview ref={ref} book={currentDisplayingBook}></BookPreview>
      </div>
    );
  }
  
export default Homepage;
  