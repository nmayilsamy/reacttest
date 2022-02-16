import Navbar from './Navbar'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, getDocs, collection, deleteDoc, doc, query, orderBy, limit, where} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'
import Createpost from './Createpost'


const OneJudgmentdisplay=() => {

  const [postlists,setPostlists] = useState([])
  const [user, setUser] = useState("")
  const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())
  let { citation } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
      const  postsCollection = await collection(db,"judgment")
      const data3= await getDocs(query(postsCollection, orderBy( "Posttime", 'desc'), where("Citationno","==",citation), limit(3)));
      setPostlists(data3.docs.map((doc) =>({...doc.data(), id: doc.id})))
      console.log(data3)
    } catch (error) {
      console.log(error)
    }
    }
    getPosts();
  },[])




onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
})

const deletePost = async (id) => {
  const postDoc =doc(db,"judgment",id)
  await deleteDoc(postDoc)
  window.location.pathname='/Home'
}


  return (
      <div >
      <div className="Navbar"> <Navbar /> </div>
      <div className="Createpost">
      {postlists.map((posts)=>{return (
        <div className="blogwrap">
        <div className="title">
         <h3>{posts.Citationno}
         {posts.Author === auth.currentUser.email && <button onClick={()=>{deletePost(posts.id)}}>X</button>} </h3>
         </div>
         <div className="blogpost">
              <div className="judgmentheader">
                <p className="courtname"> {posts.Court} </p>
                <h4>{posts.Caseno}</h4>
                <h4>{posts.Judge}</h4>
                <h4 className="party">{posts.Party1}</h4>
                <h4 className="vs"> -- VS --</h4>
                <h4 className="party">{posts.Party2}</h4>
                </div>
                <h4 className="party">Act: {posts.Act}, Section: {posts.Section} </h4>
                <h4>Head Notes:</h4><p><ReactMarkdown children={posts.Headnotes} /> </p>
                <h4>Citations: {posts.PreviousCitations}</h4>
                <h4>Judgment: </h4>
                 <p><ReactMarkdown children={posts.Judgmentbody} /> posted on: {posts.Posttime}  , Posted by: {posts.Author}</p>
         </div>
         </div>
        )})}
      </div>
      </div>
  );
}

export default OneJudgmentdisplay
