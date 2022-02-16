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


const QuestionsDisplay=() => {

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
      <div className="Navbar"> <Navbar /> </div>
      <div className="Createpost">
      {postlists.map((posts)=>{return (
        <div className="blogwrap">
        <div className="title">
         <h3>{posts.Subject}
         {posts.Author === auth.currentUser.email && <button onClick={()=>{deletePost(posts.id)}}>X</button>} </h3>
         </div>
         <div className="blogpost">
              <div className="judgmentheader">

              </div>

                <p><ReactMarkdown children={posts.Question} /> posted on: {posts.Posttime}  , Posted by: {posts.Author}</p>
         </div>
         </div>
        )})}
      </div>
      </div>
  );
}

export default QuestionsDisplay
