import '../Css/Homepage-style.css'
import BookPreview from './Components/BookPreview';
import BookStore from './Components/BookStore';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Library from './Components/Library';

export const HomepageEndpoint = "http://localhost:5000"

export const Screens = {
	Store: 0,
	Library: 1,
  Dashboard: 2,
}

const loggedIn = localStorage.getItem('LoggedUser');

function Homepage() {
    let showPreview = {
      display: 'flex'
    };
    let noPreview = {
      border: '1px solid black'
    };

    var currentDisplayingBook = null;
    var [currentScreen,changeState] = useState(Screens.Store);
    var [ref,setRef] = useState(React.createRef())

    useEffect(() => {
      if(sessionStorage.getItem('window') === 'dashboard') {
        changeState(Screens.Dashboard);
        sessionStorage.setItem('window', '');
      }
      else if(sessionStorage.getItem('window') === 'library') {
        changeState(Screens.Library);
        sessionStorage.setItem('window', '');
      }
    }, []);
    
    //page manager
    function ChangeWindow(page) {
        //page continene l'id dei componenti del toggle menu
        changeState(page)
        ref.current.SetBook(null)
    }

    //Book overview manager
    function OnBookClicked(event){ 
      ref.current.SetBook(event.currentTarget.id)
    }

    function CloseBookPreview(){
      ref.current.SetBook(null)
      console.log("test")
    }

    return (
      <div className='HomeContainer'>
        {!loggedIn && <Navigate to="/login" />}
        <Navbar OnNavigatorClick={ChangeWindow}></Navbar>
        <hr />
        {
          currentScreen === Screens.Store && <BookStore OnBookClick={OnBookClicked} currentScreen={currentScreen}></BookStore>
        }
        {
          currentScreen === Screens.Library && <Library OnBookClick={OnBookClicked}></Library>
        }
        <BookPreview  ref={ref} book={currentDisplayingBook} CloseWindow={CloseBookPreview}></BookPreview>
        {
          currentScreen === Screens.Dashboard && <Dashboard ref={ref} book={currentDisplayingBook}></Dashboard>
        }
        
      </div>
    );
  }
  
export default Homepage;
  