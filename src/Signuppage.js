import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import {auth} from './firebaseconfig'
import  {createUserWithEmailAndPassword,
          onAuthStateChanged,
          signOut,
          signInWithEmailAndPassword,
          sendPasswordResetEmail
        } from 'firebase/auth'
import {userContextVal} from './contextlogin'
import Navbar from './Navbar'

const Signupage = () => {
  let navigate = useNavigate();
const [regEmail, setRegEmail] = useState('');
const [regPass, setRegPass] = useState('');
const [logEmail, setlogEmail] = useState('');
const [logPass, setlogPass] = useState('');
const [user, setUser] = useState({});
const [resetEmail, setresetEmail] = useState('');

onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
})


    const Regis = async () => {
try {
  const user = await createUserWithEmailAndPassword(auth,regEmail,regPass)
  navigate("/Home")
  console.log(user)
} catch (error) {
  console.log(error.message)
}

    };


    return(
          <div>
                    <div className="Navbar">
                    <Navbar />
                    </div>

                    <div className="homeLogin">
                        <h1> Register </h1>
                        <input placeholder="Email"
                         onChange={(event) => setRegEmail(event.target.value)} />
                        <input placeholder="Password" type="password"
                        onChange={(event) => setRegPass(event.target.value)} />
                        <button onClick={Regis}> Register </button>
                  </div>
          </div>
        );
    }

  export default Signupage
