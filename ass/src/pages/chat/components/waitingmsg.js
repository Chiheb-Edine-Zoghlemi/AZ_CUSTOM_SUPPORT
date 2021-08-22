import React from 'react'

const waitingmsg = () => {
    return (
        <>
            <div className="d-flex flex-column">
                <div className=" d-flex flex-row-reverse">
                  <div className="my-message p-3 text-justify" style={{"maxWidth": "40%"}}>
                    <h5 id="waiting_msg">
                    <span >.</span> <span>.</span> <span>.</span>
                    </h5>        
                  </div>
                  </div>
                  
              </div>
        </>
    )
}

export default waitingmsg
