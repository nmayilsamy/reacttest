import Navbar from "./Navbar";
import Postdisplay from "./postdisplay";
import Createpost from "./Createpost";
import Ecdisplayhome from "./EcDisplayhome";
import Ecdisplay from "./EcDisplay";
import Titleonly from "./titleonly"
import JudgmentTitleOnly from "./judgmentTitleonly"
import QuestionsOnly from "./QuestionsOnly"
import {Link} from 'react-router-dom'
const Blogpage = () => {
    return (
        <div>
              <div className="Navbar">
              <Navbar />
              </div>

              <div className="homebody">
                    <div className="homepagepart1">
                    <div class="forum">
                    <p className="Linkbutton forum title3"> Forum - Legal Queries </p>
                     <QuestionsOnly />
                     <Link className="Linkbutton forum title3" to ="/postquestions">Ask </Link>
                    <p className="Linkbutton forum title3"> Latest News </p>
                    <Titleonly />
                    <p className="Linkbutton forum title3"> Latest News </p>
                    <Ecdisplayhome />
                    </div>


                    <div>

                       <div class="forum">
                         <p className="Linkbutton forum title3"> Latest Judgments </p>
                          <JudgmentTitleOnly/>
                       </div>
                       <div class="forum ">
                       <p className="Linkbutton forum title3"> Forum - Post your Legal Quries Here </p>
                        <QuestionsOnly />
                       </div>

                    </div>

                    </div>

              </div>

        </div>
     );
}

export default Blogpage;
