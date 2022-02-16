import {Link, useNavigate} from 'react-router-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {createContext, useState} from 'react'
import {userContextVal} from './contextlogin'
import Signup from './signup'
import Frontpage from './Frontpage'
import LoginPage from './LoginPage'
import Navbar from './Navbar'
import Postdisplay from './postdisplay'
import './Home.css'
import {auth} from './firebaseconfig'
import  {
          onAuthStateChanged,
          getAuth
        } from 'firebase/auth'
import {useEffect} from 'react'
import Blogpage from './Blogpage'
import Createpost from './Createpost'


const Home = () => {
 let navigate = useNavigate();
  const [user, setUser] = useState("[]")

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })

  useEffect(() => {
    let usenam=getAuth()
    setUser(usenam.currentUser)
    console.log(usenam.email)
  })



  return (
      <div>
            <div className="Navbar">
              <Navbar />
            </div>
            <div>
            <Postdisplay />
            <div>
            <Createpost />
            </div>
            </div>
      </div>
  );
}

export default Home
