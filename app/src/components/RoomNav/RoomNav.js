import React from 'react';
import {Link} from 'react-router-dom';
import './RoomNav.css';

function RoomNav(props) {

    return (
        <nav>
            <ul>
                <Link to={`/chat?room=family`}>
                    <li>Family</li>                
                </Link>
                <Link to={`/chat?room=friends`}>
                    <li>Friends</li>                
                </Link>
                <Link to={`/chat?room=work`}>
                    <li>Work</li>                
                </Link>
            </ul>
        </nav>
    );
}

export default RoomNav;