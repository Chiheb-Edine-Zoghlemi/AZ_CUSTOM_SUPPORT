import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  Chat from './pages/chat/components/chat'
import  Chatlist from './pages/chat/components/chat_list'
//import Notfound from './pages/404/notfound';
import { useState } from 'react';

function App() {
  const [Selected_chat, setSelected_chat] = useState(null)
  const  [chats, setchats] = useState([])

  return (
  <Router>
        <Switch>
          <Route exact path="/">
          <div id="chat">              
    <div className="container-fluid" >
      <div className="row">
        <div className="col-12">
        <div id="chat_header"  className=" d-flex  justify-content-between p-2" > 
          <span className="align-self-center"> 
          <h4 className=" text-capitalize"> 
            <i className="fab fa-amazon"></i> amazon Support
          </h4>
          </span>
          <span className="d-flex justify-content-around align-self-cente  w-50" >
            {
              Selected_chat !== null && chats.length > 0 ?
              <>
              <h6 className="align-self-center fading">Email : {chats[Selected_chat].email} </h6>
              <h6 className="align-self-center  fading">Order ID : {chats[Selected_chat].orderid} </h6>
              <span onClick={()=>{setSelected_chat(null) }}  className="align-self-center close"><h6><i className="fas fa-times"></i></h6></span>
              </>
              :
              null
            }
              
          </span>
         
          
        </div>

        </div>
      </div>
        <div className="row">
        <Chatlist setSelected_chat={setSelected_chat} chats={chats} setchats={setchats} />
        {Selected_chat != null && chats.length > 0  ? <Chat chats={chats}  setchats={setchats}  Selected_chat={Selected_chat}/> : 
        
        <div  className="col-9 fading">
        <div className="d-flex  h-100 justify-content-center align-items-center ">
        <h1>No Chat is selected</h1>
        </div>
        </div>
        
        }
        </div>
    </div>
    <div className="container-fluid " >
        <div className="row pt-2 ">
                <div className="col-12 text-white d-flex justify-content-between  " id='footer'>
                    <h6 className="footer_text"> This application is created by <a href="mailto:webmaster@example.com">  <span>A</span>utomated <span>S</span>olutions <span>E</span>nterprise </a> </h6> 
                <h6 >&copy;ASE </h6>
                </div>
            </div>
        </div>
    </div>
              
          </Route>
         
         {/* 
          <Route  path="*">
            <Notfound/>
          </Route>
         */}
        </Switch>
      
    </Router>
  )
}

export default App;
