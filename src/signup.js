import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import {auth} from './firebaseconfig'
import  {createUserWithEmailAndPassword,
          onAuthStateChanged,
          signOut,
          signInWithEmailAndPassword,
          sendPasswordResetEmail
        } from 'firebase/auth'
import {userContextVal} from './contextlogin'

const Signup = () => {

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
  console.log(user)
} catch (error) {
  console.log(error.message)
}

    };

    const Login = async () => {
      try {
        const user = await signInWithEmailAndPassword(auth,logEmail,logPass)
        console.log(user)
      } catch (error) {
        console.log(error.message)
      }
    };

    const Logout = async () => {

        await signOut(auth)
    };


    const Reset = async () => {
      try {
         await sendPasswordResetEmail(auth,resetEmail)
      } catch (error) {
        console.log(error.message)
      }
    };



    return(
          <div>
                  <h3> Sign up </h3>
                  <Link to="/"> Home?</Link>
                    <div>
                        <h1> Regsiter </h1>
                        <input placeholder="Email"
                         onChange={(event) => setRegEmail(event.target.value)} />
                        <input placeholder="Password"
                        onChange={(event) => setRegPass(event.target.value)} />
                        <button onClick={Regis}> Register </button>
                  </div>
                  <div>
                      <h1> Login </h1>
                      <input placeholder="Email"
                      onChange={(event) => setlogEmail(event.target.value)}/>
                      <input placeholder="Password"
                      onChange={(event) => setlogPass(event.target.value)} />
                      <button onClick={Login}> Login </button>
                      <h1> {user?.email} </h1>
                      <button onClick={Logout}> Sign out </button>
                  </div>
                  <div>
                    <h1> Reset </h1>
                    <input placeholder="Email"
                    onChange={(event) => setresetEmail(event.target.value)}/>
                  </div>
                  <button onClick={Reset}> Sign out </button>
          </div>
        );
    }

  export default Signup
