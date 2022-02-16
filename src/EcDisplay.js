import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {addDoc, getDocs, collection, deleteDoc, doc, query, orderBy, limit} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'
import Createpost from './Createpost'


const Ecdisplay=() => {

  
  const [postlists,setPostlists] = useState([])
  const [user, setUser] = useState("")
  const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())

  let navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
      const  postsCollection = await collection(db,"EC")
      const data3= await getDocs(query(postsCollection, orderBy( "Posttime", 'desc'), limit(3)));
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
  const postDoc =doc(db,"EC",id)
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
         <h1>{posts.Title}
         {posts.Author === auth.currentUser.email && <button onClick={()=>{deletePost(posts.id)}}>X</button>} </h1>
         </div>
         <div className="blogpost">
         <h4>Village Name: {posts.Village}</h4>
         <h4>S.F.No: {posts.Sfno}</h4>
         <h4>Type : {posts.Ectype}</h4>
         <p><ReactMarkdown children={posts.Post} /> posted on: {posts.Postdate}  , Posted by: {posts.Author}</p>
         <button>Comment</button>
         <button>Like</button>
         </div>
         </div>
        )})}
      </div>
      </div>
  );
}

export default Ecdisplay
