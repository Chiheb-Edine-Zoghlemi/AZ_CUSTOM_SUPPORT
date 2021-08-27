import React from 'react'

const message = (props) => {
    const mymsg_class = props.info['user'] ? ' flex-row-reverse': ' flex-row' ;
    const msg_colr =  props.info['user']  ? ' my-message ': ' boot-message ' ;
    const msg_time =  props.info['user']  ? ' d-flex flex-row-reverse text-start ': '  ' ;
    return (
        <>
            <div  className="d-flex flex-column fading">
                <div className={"d-flex "+mymsg_class} >
                  <div className={msg_colr +" p-3 text-justify"} style={{"maxWidth": "40%"}}>
                    <span>
                    {props.info['msg']}
                    </span> 
                  </div> 
                </div>
                <span className={msg_time}>
                  <small>{props.info['time']}</small>
                </span>
              </div>
            
        </>
    )
}

export default message
