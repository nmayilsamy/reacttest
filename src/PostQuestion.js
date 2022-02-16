import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'

const PostQuestion=() => {

const [title,setTitle] = useState("")
const [question,setQuestion] = useState("")
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
  const k = ''
    let text4= title.replace(/[^a-zA-Z0-9_-]/g,'_')
    let title2 = text4.trim()
    console.log(title2)


  console.log(text4)
  setTodaydate(new Date().toLocaleDateString())
  setTimenow(new Date().toLocaleTimeString())
  let  postsCollection = await collection(db,"questions")
try {
    await addDoc(postsCollection, {
      Subject: title2,
      Question: question,
      Postdate: todaydate,
      Posttime: todaydate + k + timenow,
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
           <h1 className="forum query">Post Your Query</h1>
           <div>
           <input type="text" className="querytextbx" placeholder="Post subject of your Questions like selling of property , fraud sale , Online sale fraud, Domestic violence "
           onChange={(event) =>{setTitle(event.target.value)}} />
           </div>
           <div>
           <textarea className="querydetailbox" placeholder="Post Full Details"
           onChange={(event) =>{setQuestion(event.target.value)}} />
           </div>
           <button className="button2" onClick={setPostcont}> Post </button>
        </div>
        <ReactMarkdown children={question} />
    </div>
  );
}

export default PostQuestion
