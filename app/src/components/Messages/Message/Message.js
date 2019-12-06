import React from 'react';

import './Message.css';

const Message = ({ message: { text, username }, currentUsername }) => {
  let isSentByCurrentUser = false;
  
  const trimmedUsername = currentUsername.trim().toLowerCase();

  if(username === currentUsername) {
    isSentByCurrentUser = true;
  }

  return (
        isSentByCurrentUser
        ?
        (
          <div className="message  ownMessage">
            <p><b>{trimmedUsername}</b></p>
            <div>
              <p>{text}</p>
            </div>
          </div>
        )
        :
        (
          <div className="message">
            <p>{username}</p>
            <div>
              <p>{text}</p>
            </div>
            
          </div>
        )
  );
}

export default Message;