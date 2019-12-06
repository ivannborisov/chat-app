import React from 'react';
import { Link } from "react-router-dom";

import './Registration.css';

class Registration extends React.Component {

    constructor (props) {
        super(props);
 
        this.state = {
            username: '',
            password: '',
            isRegSuccessfull: null,
            error: null
        };
    }

    handleChangeUsername = (e) => {
        this.setState({username: e.target.value});
    }
    
    handleChangePassword = async (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = async () => {
        const rawResponse = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.username})
        }); 
        const content = await rawResponse.json();

        console.log(content);

        if (content.success) 
            this.setState({isRegSuccessfull: true});    
        else {
            this.setState({error: content.error});
            this.setState({isRegSuccessfull: false});
        }

    }

    render() {
        return (
            <div className="registerOuterContainer"> 
                <h3>Registration</h3>
                <input placeholder="Username" value={this.state.username} type="text" onChange={this.handleChangeUsername}/>
                <input placeholder="Password" value={this.state.password} type="password" onChange={this.handleChangePassword} />
                <button onClick={() => {this.handleSubmit()}}>
                    Register
                </button>
                {this.state.isRegSuccessfull ? (
                    <p>Successfull registration. Please log in  <Link to={`/`}> here  </Link></p>
                ): null}
                {this.state.error ? (
                    <p>Login error: {this.state.error}</p>
                ): null}
            </div>
        );
    }
 
}

export default Registration;