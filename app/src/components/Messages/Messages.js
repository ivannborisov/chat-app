import React from 'react';
import Message from './Message/Message';

const Messages = ({ messages, currentUsername }) => (
    <div>
      {messages.map((message, i) => <div key={i}><Message message={message} currentUsername={currentUsername}/></div>)}
    </div>
  );
  
  export default Messages;