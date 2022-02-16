import {Link} from 'react-router-dom'
import {auth} from './firebaseconfig'
import {useState} from 'react'
import  {
          onAuthStateChanged
        } from 'firebase/auth'


const Navbar =() => {

 const [user, setUser] = useState("")

 onAuthStateChanged(auth, (currentUser)=>{
   setUser(currentUser);
 })



  return(
    <div className="navbar">
                  <div className="nvlinks">
                  <center> </center> <div className="Bheader"> Legal Views</div>
                  {user ? <Link className="Link" to ="/Home">Home</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/create">Create Post</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/createjudgment"> Add Judgment</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/createec">EC create</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/ecdisplay">EC View</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/judgment">Judgments</Link> : <div></div>}
                  {user ? <Link className="Link" to ="/postquestions">Ask </Link> : <div></div>}
                  {user ? <Link className="Link" to ="/questions">Forum </Link> : <div></div>}
                  {user ? <p className="Linkusername"> {user.email} </p> : <div></div>}
                  {user ? <Link className="Link" to ="/signout">Sign out</Link> : <div></div>}
                  </div>
                  <div>

                  </div>
    </div>
  );

}

export default Navbar
