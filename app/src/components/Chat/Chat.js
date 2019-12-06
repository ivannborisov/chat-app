import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import RoomNav from '../RoomNav/RoomNav';
import { Redirect} from "react-router-dom";

import './Chat.css';
import { getCookie} from '../../utilities/cookies';

let socket;

const Chat = ({location}) => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(getCookie('username'));
    const [messages, setMessages] = useState([]);
    const [isError, setError] = useState(null);

    const SERVER_ADDRESS = process.env.SERVER_ADDRESS || 'localhost:5000';

    useEffect(() => {
        const  room  = queryString.parse(location.search).room || 'family' ;
        const token = getCookie('token');

        setRoom(room);
        socket = io.connect(SERVER_ADDRESS, {
            query: {token: token}
        });

        socket.emit('join', { username ,room }, (messages) => { 
            setMessages(messages);
        });

       
        socket.on ('error' , (error) => {
            alert(error)
            setError(error)
        })
    }, [location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message ]);
          });
      
        return () => {
            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if (message) {
            socket.emit('sendMessage', {room, message}, () => {
                setMessage('')
            });
        }
    }

    const renderErrorRedirect = () => {
        if (isError) {
          return <Redirect to='/' />
        }
    }

    return (
        <div className="chatOuterContainer">
            {renderErrorRedirect()}

            <h1>Chat app</h1>
            <h3>Room: {room}</h3>
            <h5>User: {username}</h5> 
            <RoomNav/>
            <div className="chatContainer">
                <Messages messages={messages} currentUsername={username} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
            </div>           
        </div>
    )
};

export default Chat;