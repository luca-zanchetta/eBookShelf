import '../Css/Homepage-style.css'
import BookPreview from './Components/BookPreview';
import BookStore from './Components/BookStore';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Library from './Components/Library';

export const Screens = {
	Store: 0,
	Library: 1,
  Dashboard: 2,
}

const loggedIn = localStorage.getItem('LoggedUser');

function Homepage() {
    var currentDisplayingBook = null;
    var [currentScreen,changeState] = useState(Screens.Store);
    var ref = React.createRef()

    //page manager
    function ChangeWindow(page) {
        //page continene l'id dei componenti del toggle menu
        changeState(page)
    }

    //Book overview manager
    function OnBookClicked(event){
      ref.current.SetBook(event.currentTarget.id)
    }

    return (
      <div className='HomeContainer'>
        {!loggedIn && <Navigate to="/login" />}
        <Navbar OnNavigatorClick={ChangeWindow}></Navbar>
        <hr />
        {
          currentScreen == Screens.Store && <BookStore OnBookClick={OnBookClicked} currentScreen={currentScreen}></BookStore>
        }
        {
          currentScreen == Screens.Store && <BookPreview ref={ref} book={currentDisplayingBook}></BookPreview>
        }
        {
          currentScreen == Screens.Dashboard && <Dashboard ref={ref} book={currentDisplayingBook}></Dashboard>
        }
        {
          currentScreen == Screens.Library && <Library></Library>
        }
      </div>
    );
  }
  
export default Homepage;
  