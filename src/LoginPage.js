import {Link, useNavigate, Navigate, Redirect} from 'react-router-dom'
import {useState, useContext} from 'react'
import {auth} from './firebaseconfig'
import './Home.css'
import './Navbar.css'
import  {createUserWithEmailAndPassword,
          onAuthStateChanged,
          signOut,
          signInWithEmailAndPassword,
          sendPasswordResetEmail
        } from 'firebase/auth'
import {userContextVal} from './contextlogin'
import Navbar from './Navbar'
import Signuppage from './Signuppage'


const LoginPage= () => {

const [regEmail, setRegEmail] = useState('');
const [regPass, setRegPass] = useState('');
const [logEmail, setlogEmail] = useState('');
const [logPass, setlogPass] = useState('');
const [errormsg,setErrormsg] = useState('');
const [user, setUser] = useState({});
const [resetEmail, setresetEmail] = useState('');
let navigate = useNavigate();
onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
  return <Navigate to='/Signup' replace={true} />;
})

    const Login= async () => {
      try {
        const user = await signInWithEmailAndPassword(auth,logEmail,logPass)
        console.log(user)
        navigate("/Home")
      } catch (error) {
        switch(error.message) {
            case "Firebase: Error (auth/wrong-password).":
                    setErrormsg("invalid password");
                    break;
           case "Firebase: Error (auth/invalid-email).":
                     setErrormsg("invalid Email");
                    break;
          case "Firebase: Error (auth/wrong-password).":
                    setErrormsg("Wrong password");
                    break;
          case "Firebase: Error (auth/user-not-found).":
                    setErrormsg("No such user - Sign up");
                              break;
          default:
              setErrormsg("Account Error Retry after some time");
              break;
          }

      }
    };



    return(
          <div className="loginpage">
                  <div className="loginbox title3 ">
                  <div>
                    <h1 className="Linkbutton forum title3 " >Legal Views</h1>
                  </div>
                  <p className="dangererr"> {errormsg} </p>
                  <div>
                  <div>

                  </div>
                  <div>
                      <input className="textbx" placeholder="Email"
                      onChange={(event) => setlogEmail(event.target.value)}/>
                      <div>
                      <input className="textbx" placeholder="Password" type="password"
                      onChange={(event) => setlogPass(event.target.value)} />
                      </div>
                      <div>
                      <button className="button2" onClick={Login}> Login </button>
                      </div>
                  </div>
                  <div className="SignupLink">
                      <Link className='LinkSignup' to ="/signup">Sign Up </Link>
                      <Link className='LinkSignup' to ="/">Forgot Password </Link>
                  </div>
                                  </div>
              </div>

          </div>
        );
    }

  export default LoginPage
