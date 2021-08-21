import React from 'react'
import  logo from '../../assets/logo.ico'
import './login.css'
import { useState } from 'react'
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
const Login = () => {
    let history = useHistory();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    const [email, setemail] = useState("");
    const [order, setorder] = useState("")
    const [open, setOpen] = useState(true);
    const logging =  async () => { 
        setOpen(!open)
        await sleep(2000)
        if (email !=='Chiheb') {
            $( "#email_feed_back" ).fadeIn("slow")
            $( "#order_feed_back" ).fadeIn("slow")
            setOpen(open)
        }else {
            history.push('/chat')
        }
        
        
        
    }
    return (
        <div className="login"> 
        <div className="bg">
        <section className="p-3">
            <img src={logo} width="100px" alt='logo' />
            <hr/>
        </section>
        <div className="container   h-75">
     
            <div className="row d-flex h-75 justify-content-center align-items-center">
               
                <div className="col-6  d-flex flex-column  align-items-center">
                    <div className="text-center" style={{"height": "10vh"}}>
                        <h1> <span>A</span>mazon <span>C</span>hat <span>S</span>upport</h1> 
                    </div>
                    <div className=" p-2  ">
                        <input type="text" className="form-control form-control-lg " placeholder="Please Provide Your Email"   
                        value={email}
                        onChange={e => setemail(e.target.value)}
                        />
                        <small id="email_feed_back" className="p-4 invalid">
                        Please Provide Your Email
                        </small>
                        <input type="text" className="form-control form-control-lg mt-4" placeholder="Please Provide Your Order"   
                        value={order}
                        onChange={e => setorder(e.target.value)}
                        />
                       
                        <small id="order_feed_back" className="p-4 invalid">
                            Please Provide The Order ID 
                        </small>
                       
                    </div>
                    <div className="div mt-4">
            
                    
                        <button className="btn btn-outline-primary" type="button" id="login_btn" onClick={() => {logging()}}>
                        { open ? <>LOGIN <i className="fas fa-sign-in-alt"></i> </> : <> <span >.</span> <span>.</span> <span>.</span> </>  }

                        </button>
                   
                   
                    </div>
                </div>
            </div>
    
        </div>
    </div>
    </div>
    
    )
}

export default Login
