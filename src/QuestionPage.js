import Navbar from './Navbar'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import {addDoc, getDocs, collection, deleteDoc, doc, query, orderBy, limit, where} from "firebase/firestore"
import {db, auth} from './firebaseconfig'
import  {
          onAuthStateChanged
        } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'
import Createpost from './Createpost'
import QuestionsOnly from './QuestionsOnly'
import TitleOnly from './titleonly'


const QuestionPage=() => {

  const textval = useRef(" ")
  const [postlists,setPostlists] = useState([])
  const [postlists1,setPostlists1] = useState([])
  const [comments,setComments] = useState([])
  const [user, setUser] = useState("")
  const [todaydate, setTodaydate] = useState(new Date().toLocaleDateString())
  const [timenow, setTimenow] = useState(new Date().toLocaleTimeString())
  let { subject } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try {
      const  postsCollection = await collection(db,"questions")
      const postcomments = await collection(db,"commentsques")
      const data = await query(postsCollection, where("Subject", "==", subject));
      const data3= await getDocs(query(postsCollection,  where("Subject", "==", subject)));
      const data4= await getDocs(query(postcomments,  where("commentsubject", "==", subject)));
      console.log(subject)
      const data2 = await getDocs(data);
      setPostlists(data3.docs.map((doc) =>({...doc.data(), id: doc.id})))
      setPostlists1(data4.docs.map((doc) =>({...doc.data(), id: doc.id})))
      console.log(data3.docs.map((doc) =>({...doc.data(), id: doc.id})))
      console.log(data2.docs.map((doc) =>({...doc.data(), id: doc.id})))
      console.log(data3)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
    }
    getPosts();
  },[subject])


  const getPost1 = async () => {
    try {
    const  postsCollection = await collection(db,"questions")
    const postcomments = await collection(db,"commentsques")
    const data = await query(postsCollection, where("Subject", "==", subject));
    const data3= await getDocs(query(postsCollection,  where("Subject", "==", subject)));
    const data4= await getDocs(query(postcomments,  where("commentsubject", "==", subject), orderBy( "Posttime")));
    console.log(subject)
    const data2 = await getDocs(data);
    setPostlists(data3.docs.map((doc) =>({...doc.data(), id: doc.id})))
    setPostlists1(data4.docs.map((doc) =>({...doc.data(), id: doc.id})))
    console.log(data3.docs.map((doc) =>({...doc.data(), id: doc.id})))
    console.log(data2.docs.map((doc) =>({...doc.data(), id: doc.id})))
    console.log(data3)
    console.log(data)

  } catch (error) {
    console.log(error)
  }
  }


  const setPostcont = async() => {
    let  postsCollection1 = await collection(db,"commentsques")
    const k = " "
  try {
      await addDoc(postsCollection1, {
        commentsubject: subject,
        Comments: comments,
        Postdate: todaydate,
        Posttime: todaydate + k + timenow,
        Author: user.email}
        )
       console.log('created')
       setTimenow(new Date().toLocaleTimeString())
       setTodaydate(new Date().toLocaleDateString())
       textval.current.value=""
       getPost1();
     } catch (error) {
       console.log(error);
     }
  }





onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
})

const deletePost = async (id) => {
  const postDoc =doc(db,"commentsques",id)
  await deleteDoc(postDoc)
  getPost1();
}

const deletePost1 = async (id) => {
  const postDoc =doc(db,"questions",id)
  await deleteDoc(postDoc)
  window.location.pathname='/Home'
}

  return (
      <div >
                <div className="Navbar">
                  <Navbar />
                 </div>

            <div className="querycontainer">
            <div className="forum  title3 item-2">
            <p class="Linkbutton forum title3"> Forum - Legal Queries </p>
            <QuestionsOnly />
            </div>
                 <div className="item-1">
                      {postlists.map((posts)=>{return (
                                     <div className="Createpost querytitlewrap item-1">
                                           <div>
                                           <h1>{posts.Subject}
                                           {posts.Author === auth.currentUser.email && <button className="button2" onClick={()=>{deletePost1(posts.id)}}>Delete</button>} </h1>
                                           </div>

                                          <div className="blogpost">
                                          <p><ReactMarkdown children={posts.Question} /> posted on: {posts.Posttime}  , Posted by: {posts.Author}</p>
                                          </div>
                                    </div>
                                        )})}

                     {postlists1.map((posts)=>{return (

                                   <div className="createpost ">
                                         <div className="querytitlewrap ">
                                              <p className="querytitle"><ReactMarkdown children={posts.Comments} /> </p>
                                              {posts.Author === auth.currentUser.email && <button className="button2" onClick={()=>{deletePost(posts.id)}}>Delete</button>}
                                               <p>  by: {posts.Author} </p>
                                         </div>

                                         <div className="blogpost">
                                         </div>
                                    </div>
                                    )})}

                      <div className="answerbox">
                          <div>
                          </div>
                                  <textarea className="commentsbox" ref={textval} placeholder="Post Your Answer"
                                  onChange={(event) =>{setComments(event.target.value)}} />
                           <div>
                                 <button className="button2" onClick={setPostcont}> Post </button>
                          </div>
                     </div>
              </div>




                </div>

    </div>
  );
}

export default QuestionPage
