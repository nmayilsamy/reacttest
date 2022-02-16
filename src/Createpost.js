import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'

const Createpost=() => {

const [title,setTitle] = useState("")
const [post,setPost] = useState("")
const [postnotes,setPostnotes] = useState("")
const [user, setUser] = useState("")
const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())


let navigate = useNavigate()

useEffect(() => {
  setTodaydate(new Date().toLocaleDateString())
  setTimenow(new Date().toLocaleTimeString())
},[])




onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
})

const setPostcont = async() => {
  const k = " "
  let  postsCollection = await collection(db,"posts")
  setTimenow(new Date().toLocaleTimeString())
  setTodaydate(new Date().toLocaleDateString())
try {
    await addDoc(postsCollection, {
      Title: title,
      Post: post,
      Postdate: todaydate,
      Posttime: todaydate + k + timenow,
      Postnotes: postnotes,
      Author: user.email}
      )
     console.log('created')
     navigate("/Home")

   } catch (error) {
     console.log(error);
   }
}

  return (

    <div>
    <div className="Navbar">
    <Navbar />
    </div>
    <div className="Createpost">
    <h1>Create Post</h1>
    <div>
       <label> Title </label>
      <input type="text" placeholder="Title ..."
      onChange={(event) =>{setTitle(event.target.value)}} />
    </div>
    <div>
      <label> Post Notes </label>
     <textarea placeholder="Post Notes ..."
      onChange={(event) =>{setPostnotes(event.target.value)}} />
    </div>
    <div>
      <label> Post </label>
     <textarea placeholder="Post ..."
      onChange={(event) =>{setPost(event.target.value)}} />
    </div>
    <button onClick={setPostcont}> Post </button>
    </div>
    <ReactMarkdown children={post} />
    </div>
  );
}

export default Createpost
