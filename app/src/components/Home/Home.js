import React from 'react';
import { Link, Redirect} from "react-router-dom";
import './Home.css';
import {setCookie, getCookie} from '../../utilities/cookies';


class Home extends React.Component {

    constructor (props) {
        super(props);
 
        this.state = {
            username: '',
            password: '',
            error: null,
            isLoginSuccessfull: false
        };
    }
    async componentWillMount() {
        await this.checkValidToken();

    }
    handleSubmit = async () => {
        const rawResponse = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.username})
        }); 
        const content = await rawResponse.json();

        if (!content.success) {
            this.setState({error: content.error});
        }
        else {
            this.setState({isLoginSuccessfull: true});
            setCookie('token', content.token, 1);
            setCookie('username', content.user.username, 1);
        }
    }

    handleChangeUsername = (e) => {
        this.setState({username: e.target.value});
    }
    
    handleChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    checkValidToken = async () => {
        
        const token = getCookie ('token');
        console.log(token)
        if (token) { 
            const rawResponse = await fetch('http://localhost:5000/users/auth', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }); 
            const content = await rawResponse.json(); 
            
            console.log(content)
            if (content.success)
                this.setState({isLoginSuccessfull: true});

        }
        
    }

    renderRedirect =  () => {
        console.log(this.state.isLoginSuccessfull)
        
        if (this.state.isLoginSuccessfull) {
          return <Redirect to='/chat' />
        }
    }
        
    render() {
        return (
            <div className="homeOuterContainer">
                {this.renderRedirect()}
                <h1>Chat app</h1>
                <p>
                    <input placeholder="Username" value={this.state.username} type="text" onChange={this.handleChangeUsername}/>
                </p>
                <p>
                    <input placeholder="Password" value={this.state.password} type="password" onChange={this.handleChangePassword} />
                </p>
                <button onClick={() => {this.handleSubmit()}}>
                    Log in
                </button>
                <Link to={`/registration`}>
                    Create registration 
                </Link>

                {this.state.error ? (
                    <p>Login error: {this.state.error}</p>
                ): null}
            </div>
        );
    }
 
}

export default Home;