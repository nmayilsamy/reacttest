import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import {auth} from './firebaseconfig'
import  {signOut } from 'firebase/auth'
import Navbar from './Navbar'



const Logout =() =>{
  let navigate = useNavigate();

  const Outsign = async () => {

    try {
      await signOut(auth)
      window.location.pathname='/LoginPage'
      console.log("logout")
    } catch (error) {
      console.log(error.message)
    }

  }


  return(

    <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="homeLogin">
    <h1> Signing out </h1>
    <button  onClick={Outsign()}> Sign out </button>
    </div>
    </div>
  );

}

export default Logout
