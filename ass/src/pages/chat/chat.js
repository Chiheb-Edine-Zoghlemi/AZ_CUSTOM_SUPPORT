import React from 'react'
import './chat.css'
import { useHistory } from 'react-router-dom';
const Chat = () => {
  let history = useHistory();
  const log_out =() => {
    history.push('/')
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
              <span className="align-self-center logout" onClick={()=>{log_out()}}>
              LOGOUT <i className="fas fa-sign-out-alt"></i>
              </span>
            </div>
            <div id="chat_body" className="mt-3 overflow-auto p-4" >
            {/* CHat body*/}
            </div>
            <div id="chat_footer">
              <div className="input-group  p-2">
                <input type="text" className="form-control custom_message_input" placeholder="Please Provide Your Message" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button className="btn btn-outline-primary" type="button" >
                  <i className="far fa-paper-plane"></i>
                </button>
              </div>
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
