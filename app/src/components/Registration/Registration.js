import React from 'react';
import './Registration.css';

class Registration extends React.Component {

    constructor (props) {
        super(props);
 
        this.state = {
            username: '',
            password: '' 
        };
    }

    handleSubmit () {
        console.log(this.state.username)
        console.log(this.state.password)

        console.log('Submitted')
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
    }

    render() {
        return (
            <div> 
                <h3>Registration</h3>
                <input placeholder="Username" value={this.state.username} type="text" onChange={this.handleChangeUsername}/>
                <input placeholder="Password" value={this.state.password} type="password" onChange={this.handleChangePassword} />
                <button onClick={() => {this.handleSubmit()}}>
                    Register
                </button>
            </div>
        );
    }
 
}

export default Registration;