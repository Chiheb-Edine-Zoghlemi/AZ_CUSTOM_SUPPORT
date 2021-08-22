import React from 'react'
import './chat.css'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Message from './components/message';
import Waitingmsg from './components/waitingmsg';
import UserProfile from './components/user_info';
import { useEffect } from 'react';
 const  ws = new WebSocket('ws://localhost:3500');
const Chat = () => {
 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [waiting, setwaiting] = useState(false)
  const [new_message, setnew_message] = useState("")
  let time = new Date();
  let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const [Messages, setMessages] = useState([{"msg":"Welcome To the Chat Support, How can i help you ?","time":curr_time  ,"user":true}])
  const [messageCount, setMessageCount] = useState(0);
  let history = useHistory();

  const log_out =() => {
    UserProfile.clear_all();
    setMessageCount(0)
    setwaiting(false)
    history.push('/')
  }
  

  useEffect(() => {
    if ( UserProfile.getemail() === null || UserProfile.getorder() === null ) {
      history.push('/')
    }
  });
  useEffect(() => {
    ws.onmessage = e => {
      const message = JSON.parse(e.data);
      if(messageCount > 0) {
        setwaiting(!waiting)
      }
     
      setMessages(Messages => [...Messages, message]);
    };
    
  },[waiting,messageCount]);
  
  const send_message = async (e) => {
    let time = new Date();
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    e.preventDefault();
    const newList = Messages.concat({"msg":new_message,"time":curr_time  ,"user":false});
    setMessages(newList);
    setnew_message('')
    setwaiting(!waiting)
    await sleep(3000)
    ws.send(new_message);
    setMessageCount(messageCount+1)
    
  }

    return (
<div id="chat">              
    <div className="container-fluid" >
        <div className="row">
        <div  className="col-12">
          <div className="d-flex flex-column  align-items-center  ">
            <div id="chat_header"  className="  d-flex  justify-content-between" > 
              <h4 className=" text-capitalize align-self-center"> 
                <i className="fab fa-amazon"></i> amazon Support
              </h4>
             
              <span className="d-flex justify-content-around align-self-cente  w-50" >
              <h6 className="align-self-center">Email : {UserProfile.getemail()} </h6>
              <h6 className="align-self-center ">Order ID : {UserProfile.getorder()} </h6>
              <span className="align-self-center logout " onClick={()=>{log_out()}} ><i className="fas fa-sign-out-alt"></i> </span> 
              </span>
            </div>
            <div id="chat_body" className="mt-3 overflow-auto p-4" >
            { Messages ? Messages.map((m,index) => (
            <Message   key={index} info={m} />))
              : 
              <div className=" text-center"> <h4>No Data Found</h4> </div>
            }
            {
                waiting ? <Waitingmsg/> :''
            }
            </div>
            <div id="chat_footer">
            <form onSubmit={e => {send_message(e)}}> 
              <div className="input-group  p-2">
              
                <input type="text" className="form-control custom_message_input" disabled={waiting} placeholder="Please Provide Your Message" 
                value={new_message}
                onChange={e => setnew_message(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="submit"  >
                  <i className="far fa-paper-plane"></i>
                </button>
                
              </div>
              </form>
            </div>
          </div>
        </div>
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
    )
}

export default Chat
