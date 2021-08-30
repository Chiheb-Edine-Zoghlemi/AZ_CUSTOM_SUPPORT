import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery';
import validator from 'validator'
import axios from "axios";

const Chatlist = (props) => 
{
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Email_error, setEmail_error] = useState('Please Provide a Valid Email Format')
  const [email, setemail] = useState("");
  const [order, setorder] = useState("")
  const [open, setOpen] = useState(true);
  const logging =  async (e) => { 
    let is_valid = true
    e.preventDefault();
    setOpen(!open)
    await sleep(500)
    if (!validator.isEmail(email)) {
        is_valid= false; 
        setEmail_error('Please Provide a Valid Email Format')
        $( "#email_feed_back" ).fadeIn("slow")
        
    }else {
      $( "#email_feed_back" ).fadeOut()
    }
    if(order===""){
        is_valid= false; 
        $( "#order_feed_back" ).fadeIn("slow")
       
    }else {
      $( "#order_feed_back" ).fadeOut()
    }
    if(is_valid) {
     
      /* api call  */
      let data = {'usermail':email,'order_id':order}  
      

      await axios.post('http://127.0.0.1:8000/chat', data).then((response) => {
        console.log(response.data)
        const newchatlist = {active:false,email:email,orderid:order,Messages:[], closed:false, ws : new WebSocket('ws://127.0.0.1:7890/'+order)}
        props.setchats([...props.chats,newchatlist])
        setemail('');
        setorder('');
        handleClose()
        setOpen(open)
      
      }).catch((e)=>{
        setEmail_error('This Email is Not Valid')
        $( "#email_feed_back" ).fadeIn("slow")
        setOpen(open)
        
      });
      
    
    }else {
      setOpen(open)
    }
    
}
const delete_chat = (index) => { 
  let old_chat = props.chats
  const new_list = [...old_chat.slice(0, index), ...old_chat.slice(index + 1)]
  props.setchats(new_list)
  

}
    return (
      <>
        <div id="chat_list" className="col-3 overflow-auto">
        <div className="p-3 ">
       
        <h5 className="text-center new_chat" onClick={handleShow}> 
        Create New Chat <i className="fas fa-comment-medical"></i>
        </h5>
        {
        props.chats.map((c,index) => 
          <div key={index} className="card  mt-3 mb-3 p-2 fading" >
          <div className="card-body">
            <div className="d-flex justify-content-between ">
              <h5 onClick={() => {props.setSelected_chat(index)}}  className="card-title text-capitalize"> Email :  {c.email}</h5>
              <p className="align-self-center close" onClick={()=>{delete_chat(index)}} ><i className="fas fa-trash-alt"></i></p>
            </div>
            <p className="card-text text-start text-truncate">Order ID : {c.orderid}</p>
          </div>
          </div>
        )
        }
        </div>
     
        
        </div>
        <Modal
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ADDING NEW CHAT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <form className="text-center" onSubmit={e => logging(e)}> 
                    <div className=" p-2  ">
                        <input type="text" className="form-control form-control-lg " placeholder="Please Provide Your Email"   
                        value={email}
                        onChange={e => setemail(e.target.value)}
                        />
                        <small id="email_feed_back" className="p-4 invalid">
                        {Email_error}
                        </small>
                        <input type="text" className="form-control form-control-lg mt-4" placeholder="Please Provide Your Order"   
                        value={order}
                        onChange={e => setorder(e.target.value)}
                        />
                       
                        <small id="order_feed_back" className="p-4 invalid">
                            Please Provide a Valid Order ID 
                        </small>
                       
                    </div>
                    <div className="div mt-4 mb-2">
            
                    
                        <button className="btn btn-outline-primary w-25" type="submit" id="login_btn" >
                        { open ? <>ADD <i className="fas fa-comment-medical"></i> </> : <> <span >.</span> <span>.</span> <span>.</span> </>  }

                        </button>
                   
                   
                    </div>
                    </form>
      </Modal.Body>
    </Modal>
        </>
    )
}

export default Chatlist
