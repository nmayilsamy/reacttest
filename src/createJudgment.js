import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'

const CreateJudgment=() => {

const [citationno,setCitationno] = useState("")
const [court,setCourt] = useState("")
const [judge,setJudge] = useState("")
const [caseno,setCaseno] = useState("")
const [party1,setparty1] = useState("")
const [party2,setparty2] = useState("")
const [headnotes,setHeadnotes] = useState("")
const [previousCitations,setpreviousCitations] = useState("")
const [judgmentbdy,setjudgmentbdy] = useState("")
const [act, setAct] = useState("")
const [section, setSection] = useState("")
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
  let  postsCollection = await collection(db,"judgment")
  setTimenow(new Date().toLocaleTimeString())
  setTodaydate(new Date().toLocaleDateString())
try {
    await addDoc(postsCollection, {
      Citationno: citationno,
      Court: court,
      Judge: judge,
      Caseno: caseno,
      Party1: party1,
      Party2: party2,
      Headnotes: headnotes,
      Act:act,
      Section:section,
      PreviousCitations: previousCitations,
      Judgmentbody: judgmentbdy,
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
              <label> Citation No</label>
              <input type="text" placeholder="Citation no ..."
              onChange={(event) =>{setCitationno(event.target.value)}} />
              </div>

              <div>
                <label> Court Name </label>
                <input type="text" placeholder="Court Name ..."
                onChange={(event) =>{setCourt(event.target.value)}} />
                </div>

                <div>
                <label> Judge Name </label>
                <input type="text" placeholder="Judge Name ..."
                onChange={(event) =>{setJudge(event.target.value)}} />
                </div>

                <div>
                <label> Case No </label>
                <input type="text" placeholder="Case No ..."
                onChange={(event) =>{setCaseno(event.target.value)}} />
                </div>

                <div>
                <label> Party 1</label>
                <input type="text" placeholder="Party 1 ..."
                onChange={(event) =>{setparty1(event.target.value)}} />
                </div>

                <div>
                <label> Party 2</label>
                <input type="text" placeholder="Party 2 ..."
                onChange={(event) =>{setparty2(event.target.value)}} />
                </div>

                <div>
                <label> Head Notes</label>
                <textarea placeholder="Head Notes ..."
                onChange={(event) =>{setHeadnotes(event.target.value)}} />
                </div>

                <div>
                <label> Act Name</label>
                <input type="text" placeholder="Act ..."
                onChange={(event) =>{setAct(event.target.value)}} />
                </div>

                <div>
                <label> Section</label>
                <input type="text" placeholder="Act ..."
                onChange={(event) =>{setSection(event.target.value)}} />
                </div>

                <div>
                <label> Citations</label>
                <input type="text" placeholder="Citations ..."
                onChange={(event) =>{setpreviousCitations(event.target.value)}} />
                </div>

                <div>
                <label> Judgement Body</label>
                <textarea placeholder="Judgmemnt Body ..."
                onChange={(event) =>{setjudgmentbdy(event.target.value)}} />
                </div>

                <div>
                <button onClick={setPostcont}> Post </button>
                </div>
                <ReactMarkdown children={judgmentbdy} />
    </div>
    </div>
  );
}

export default CreateJudgment
