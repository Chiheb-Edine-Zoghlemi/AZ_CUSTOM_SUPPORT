import React from 'react'
import { useState } from 'react';
import Message from './message';
import Waitingmsg from './waitingmsg';
//import { useEffect,useRef } from 'react';
const Chat = (props) => {
 /* 
  const socket = useRef(null);
  function connect() {
    socket.current = new WebSocket('ws://127.0.0.1:5000');
   
  }
  function onOpen(e) {
    console.log('socket ready state', socket.current.readyState);
  }
  function onMessage(e) {
    const data = JSON.parse(e.data);
    console.log(data)
    props.setMessages(Messages => [...Messages, data]);
    setwaiting(waiting)
  }
  function onClose(e) {
    socket.current.close()
  }
 

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    connect();
    socket.current.onopen = onOpen;
    socket.current.onmessage = onMessage;
    socket.current.onclose = onClose;
    return () => {
      socket.current.close();
    };
  }, []);
 
  
  const send_message = async (e) => {
    let time = new Date();
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    e.preventDefault();
    const newList = props.Messages.concat({"msg":new_message,"time":curr_time  ,"user":false});
    props.setMessages(newList);
    setnew_message('')
    setwaiting(!waiting)
    await sleep(3000)
    socket.current.send( JSON.stringify(new_message));
    setMessageCount(messageCount+1)
    
  }*/
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [waiting, setwaiting] = useState(false)
  const [new_message, setnew_message] = useState("")
  //const [messageCount, setMessageCount] = useState(0);
  const sending_message = async (e) => { 
    e.preventDefault();
    let time = new Date();
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let new_chat = props.chats
    new_chat[props.Selected_chat].Messages = [...new_chat[props.Selected_chat].Messages, {"msg":new_message,"time":curr_time  ,"user":false}]
    setnew_message('')
    setwaiting(!waiting)
    await sleep(3000)
    setwaiting(waiting)
    //setMessageCount(messageCount+1)
  }
    return (
      <div  className="col-9 fading">
      <div className="d-flex flex-column  align-items-center  ">
        
        <div id="chat_body" className="mt-3 overflow-auto p-4" >
        { props.chats[props.Selected_chat].Messages.length !==0 ? props.chats[props.Selected_chat].Messages.map((m,index) => (
         
        <Message   key={index} info={m} />))
          : 
          <div className=" text-center fading"> <h4>No Data Found</h4> </div>
        }
        {
            waiting ? <Waitingmsg/> :''
        }
        </div>
        <div id="chat_footer">
        <form onSubmit={e => {sending_message(e)}}> 
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
    )
}

export default Chat
