import React from 'react'
import  logo from '../../assets/logo.ico'
import './login.css'
import { useState } from 'react'
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
import UserProfile from '../chat/components/user_info';
import validator from 'validator'
const Login = () => {
    
    let history = useHistory();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    const [email, setemail] = useState("");
    const [order, setorder] = useState("")
    const [open, setOpen] = useState(true);
    const logging =  async (e) => { 
        let is_valid = true
        e.preventDefault();
        setOpen(!open)
        await sleep(2000)

        if (!validator.isEmail(email)) {
            is_valid= false; 
            $( "#email_feed_back" ).fadeIn("slow")
            
        }
        if(!validator.isAlphanumeric(order)){
            is_valid= false; 
            $( "#order_feed_back" ).fadeIn("slow")
           
        }
        if(is_valid){
            UserProfile.setemail(email);
            UserProfile.setorder(order);
            history.push('/chat')
        }
        setOpen(open)
        
        
        
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
                    <form className="text-center" onSubmit={e => logging(e)}> 
                    <div className=" p-2  ">
                        <input type="text" className="form-control form-control-lg " placeholder="Please Provide Your Email"   
                        value={email}
                        onChange={e => setemail(e.target.value)}
                        />
                        <small id="email_feed_back" className="p-4 invalid">
                        Please Provide a Valid Email
                        </small>
                        <input type="text" className="form-control form-control-lg mt-4" placeholder="Please Provide Your Order"   
                        value={order}
                        onChange={e => setorder(e.target.value)}
                        />
                       
                        <small id="order_feed_back" className="p-4 invalid">
                            Please Provide a Valid Order ID 
                        </small>
                       
                    </div>
                    <div className="div mt-4">
            
                    
                        <button className="btn btn-outline-primary" type="submit" id="login_btn" >
                        { open ? <>LOGIN <i className="fas fa-sign-in-alt"></i> </> : <> <span >.</span> <span>.</span> <span>.</span> </>  }

                        </button>
                   
                   
                    </div>
                    </form>
                </div>
            </div>
    
        </div>
    </div>
    </div>
    
    )
}

export default Login
