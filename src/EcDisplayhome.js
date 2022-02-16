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


const Ecdisplayhome=() => {


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
      <div>  </div>
      <div className="Createpost1">
      {postlists.map((posts)=>{return (
        <div className="blogwrapforum">
        <div className="title3">
        {posts.Title}
         </div>
         <div className="blogpost1">
          Village: <p> {posts.Village} ,</p>
           S.F.No: <p> {posts.Sfno} </p>
         </div>
         </div>
        )})}
      </div>
      </div>
  );
}

export default Ecdisplayhome
