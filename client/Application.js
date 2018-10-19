import React from 'react';
import ControlPanel from './ControlPanel'
import UserList from './UserList'
import LoginForm from "./actions/LoginForm";
import $ from "jquery"
import UserActions from "./actions/UserActions";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        };
        $( document ).ajaxError( () => {
            this.setState({showLogin: true})
        })
    }



    render() {
        if (this.state.showLogin !== true) {
            return <div>
                <h1>Create User form</h1>
                <ControlPanel/>
                <h1>User list</h1>
                <UserList/>
            </div>
        } else {
            return <LoginForm callback={(login, password) => UserActions.login(
                login,
                password,
                () => this.setState({showLogin: false})
            )}/>
        }
    }
}
