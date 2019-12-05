import React from 'react';

import './Message.css';

const Message = ({ message: { text, username }, currentUsername }) => {
  let isSentByCurrentUser = false;
  
  const trimmedName = currentUsername.trim().toLowerCase();

  if(username === currentUsername) {
    isSentByCurrentUser = true;
  }

  return (
        isSentByCurrentUser
        ?
        (
          <div>
            <p><b>{trimmedName}</b></p>
            <div>
              <p>{text}</p>
            </div>
          </div>
        )
        :
        (
        <div>
          <p>{username}</p>
          <div>
            <p>{text}</p>
          </div>
          
        </div>
        )
  );
}

export default Message;