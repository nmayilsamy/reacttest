import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'

const CreateEc=() => {

const [title,setTitle] = useState("")
const [Villagename,setvillagename] = useState("")
const [post,setPost] = useState("")
const [sfNo,setsfNo] = useState("")
const [ecType,setecType] = useState("")
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
  let  postsCollection = await collection(db,"EC")
  setTimenow(new Date().toLocaleTimeString())
  setTodaydate(new Date().toLocaleDateString())
try {
    await addDoc(postsCollection, {
      Title: title,
      Village: Villagename,
      Sfno: sfNo,
      Ectype: ecType,
      Post: post,
      Postdate: todaydate,
      Posttime: todaydate + timenow,
      Author: user.email}
      )
     console.log('created')
     navigate("/ecdisplay")

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
       <label> Village </label>
      <input type="text" placeholder="Village ..."
      onChange={(event) =>{setvillagename(event.target.value)}} />
    </div>
    <div>
    <div>
       <label> S.F.No </label>
      <input type="text" placeholder="S.F.No ..."
      onChange={(event) =>{setsfNo(event.target.value)}} />
    </div>
    <div>
       <label> EC Type </label>
      <input type="text" placeholder="EC Type ..."
      onChange={(event) =>{setecType(event.target.value)}} />
    </div>
      <label> Post </label>
     <textarea placeholder="Title ..."
      onChange={(event) =>{setPost(event.target.value)}} />
    </div>
    <button onClick={setPostcont}> Post </button>
    </div>
    <ReactMarkdown children={post} />
    </div>
  );
}

export default CreateEc
