import React from 'react'
import { useState } from 'react';
import Message from './message';
import Waitingmsg from './waitingmsg';
import { useEffect,useRef } from 'react';
const Chat = (props) => {
  const ws = useRef(props.chats[props.Selected_chat].ws);
  useEffect(() => {
  
    function connect() {
      ws.current = props.chats[props.Selected_chat].ws;
     
    }
    
    function onOpen(e) {
      console.log('socket ready state', ws.current.readyState);
    }
  
    function onMessage(e) {
      let new_chat = props.chats
      const data = JSON.parse(e.data);
      new_chat[props.Selected_chat].Messages = [...new_chat[props.Selected_chat].Messages, data]
      props.setchats(new_chat);
      setwaiting(waiting)
    }
  
    function onClose(e) {
      ws.current.close()
    }
   

    connect();
    ws.current.onopen = onOpen;
    ws.current.onmessage = onMessage;
    ws.current.onclose = onClose;
    return () => {
      ws.current.close();
    };
  }, []);
 
  
  const send_message = async (e) => {
    let new_chat = props.chats
    let time = new Date();
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    e.preventDefault();
    new_chat[props.Selected_chat].Messages = [...new_chat[props.Selected_chat].Messages, {"msg":new_message,"time":curr_time  ,"user":false}]
    props.setchats(new_chat);
    setnew_message('')
    setwaiting(!waiting)
    await sleep(3000)
    ws.current.send( JSON.stringify(new_message));
  
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [waiting, setwaiting] = useState(false)
  const [new_message, setnew_message] = useState("")
  //const [messageCount, setMessageCount] = useState(0);
  /*
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

  */
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
    )
}

export default Chat
