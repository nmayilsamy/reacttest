import './App.css';
import Signup from './signup'
import Home from './Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import Logout from './Logout'
import Navbar from './Navbar'
import Signuppage from './Signuppage'
import Createpost from './Createpost'
import Postdisplay from './postdisplay'
import OnePostdisplay from './Onepostdisplay'
import Blogpage from './Blogpage';
import CreateEc from './CreateEC';
import Ecdisplay from './EcDisplay';
import CreateJudgment from './createJudgment';
import Judgmentdisplayhome from './JudgmentDisplay'
import OneJudgmentdisplay from './oneJudgmentDisplay'
import PostQuestion from './PostQuestion'
import QuestionsDisplay from './QuestionsDisplay'
import QuestionPage from './QuestionPage'

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/Home" element={<Blogpage />} />
    <Route path="/LoginPage" element={<LoginPage />} />
    <Route path="/signup" element={<Signuppage />} />
    <Route path="/signout" element={<Logout />} />
    <Route path="/create" element={<Createpost />} />
    <Route path="/createec" element={<CreateEc />} />
    <Route path="/ecdisplay" element={<Ecdisplay />} />
    <Route path="/questions" element={<QuestionsDisplay />} />
    <Route path="/news/:postid" element={<OnePostdisplay />} />
    <Route path="/judgments/:citation" element={<OneJudgmentdisplay />} />
    <Route path="/questionspage/:subject" element={<QuestionPage />} />
    <Route path="/createjudgment" element={<CreateJudgment />} />
    <Route path="/postquestions" element={<PostQuestion/>} />
    <Route path="/judgment" element={<Judgmentdisplayhome />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
