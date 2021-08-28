import React from 'react'
import { useState } from 'react';
import Message from './message';
import Waitingmsg from './waitingmsg';
import {useRef } from 'react';
import {useEffect } from 'react';
const Chat = (props) => {
  const ws = useRef(props.chats[props.Selected_chat].ws);
 

  
    useEffect( () => {
      console.log('im runing')
      
       
    },[ props.chats]);  
  
  const send_message =  (e) => {
    let old_chat = props.chats
    let time = new Date();
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    e.preventDefault();
    old_chat[props.Selected_chat].Messages = [...old_chat[props.Selected_chat].Messages, {"msg":new_message,"time":curr_time  ,"user":false}]
    old_chat[props.Selected_chat].active = true;
    props.setchats(old_chat);
    setnew_message('')
    ws.current.send( JSON.stringify(new_message));
  }

 
  const [new_message, setnew_message] = useState("")
  
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
          props.chats[props.Selected_chat].active ? <Waitingmsg/> :<></>
        }
        </div>
        <div id="chat_footer">
        <form onSubmit={e => {send_message(e)}}> 
          <div className="input-group  p-2">
          
            <input type="text" className="form-control custom_message_input" disabled={props.chats[props.Selected_chat].active} placeholder="Please Provide Your Message" 
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
