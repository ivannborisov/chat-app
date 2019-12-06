import React from 'react';
import Message from './Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

const Messages = ({ messages, currentUsername }) => (
    <ScrollToBottom className="outerContainer">
      {messages.map((message, i) => <div key={i}><Message message={message} currentUsername={currentUsername}/></div>)}
    </ScrollToBottom>
);
  
export default Messages;