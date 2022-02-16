import Navbar from './Navbar'
import {useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, getDocs, collection, deleteDoc, doc, query, orderBy, limit} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'
import Createpost from './Createpost'


const JudgmentTitleOnly=() => {

  const [postlists,setPostlists] = useState([])
  const [user, setUser] = useState("")
  const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())

  let navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
      const  postsCollection = await collection(db,"questions")
      const data3= await getDocs(query(postsCollection, orderBy( "Posttime", 'desc'), limit(10)));
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
  const postDoc =doc(db,"questions",id)
  await deleteDoc(postDoc)
  window.location.pathname='/Home'
}


  return (
      <div >
      <div> </div>
      <div className="judgmenthome">
      {postlists.map((posts)=>{return (
        <div className="blogwrap1">
        <div>
        <Link className="title1" to = {`/judgments/${posts.Citationno}`} > {posts.Citationno} - {posts.Act}, Sec - {posts.Section} [ - {posts.Court}] </Link>
          </div>
         <div className="blogpost1">
              <p className="headnotes"><ReactMarkdown children={posts.Headnotes} /> </p>
         </div>
         </div>
        )})}
      </div>
      </div>
  );
}

export default JudgmentTitleOnly
