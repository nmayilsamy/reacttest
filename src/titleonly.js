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


const Titleonly=() => {


  const [postlists,setPostlists] = useState([])
  const [user, setUser] = useState("")
  const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())

  let navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
      const  postsCollection = await collection(db,"posts")
      const data = await getDocs(postsCollection);
      const data3= await getDocs(query(postsCollection, orderBy( "Posttime", 'desc'), limit(10)));
      const data2 = await query(postsCollection, limit(1));
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
  const postDoc =doc(db,"posts",id)
  await deleteDoc(postDoc)
  window.location.pathname='/Home'
}


  return (
      <div >

      <div className="Createpost1">
      {postlists.map((posts)=>{return (
        <div className="blogwrapforum">
        <div>
         <div className="title1">

        <Link className="title1" to = {`/news/${posts.Title}`} >{posts.Title}</Link>
         </div>
          <div className="postnotes">

          <div>  <Link className="Link1" to = {`/news/${posts.Title}`} >{posts.Postnotes}</Link> </div>
          </div>
         </div>
      </div>
        )})}
      </div>
      </div>
  );
}

export default Titleonly
