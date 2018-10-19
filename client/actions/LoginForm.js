import React from "react";
import UserActions from "./UserActions";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    render() {
        const {login, password} = this.state;
        return <div>
            Login: <input type="text" value={login} onChange={(e) => {this.setState({login: e.target.value})}}/><br/>
            Password: <input type="text" value={password} onChange={(e) => {this.setState({password: e.target.value})}}/><br/>
            <button onClick={() => {this.props.callback(login, password)}}>Submit</button>
        </div>
    }


}