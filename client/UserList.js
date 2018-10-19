import React from 'react'
import UserActions from './actions/UserActions'
import User from './User'
import users from '../database/users'


let lastUserId = users.lastId;

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: 0,
            btn: 5,
            update: false
        }
    }

    componentDidMount() {
        console.log("component did mount");
        UserActions.loadList(
            {skip: this.state.page*this.state.btn, pageSize: this.state.btn},
            (list) => {
                this.setState({list})
            }
        );
    }

    render() {
        console.log("user list render");

        return <div>
            <button onClick={() => this.setState({update: !this.state.update})}>update component</button>
            <button onClick={() => {this.state.page > 0 ? this.state.page-- : alert('first page'); this.componentDidMount()}}>Previous page</button>
            <button onClick={() => {this.state.btn = 5; this.state.page = 0; this.componentDidMount()}}>5</button>
            <button onClick={() => {this.state.btn = 10; this.state.page = 0; this.componentDidMount()}}>10</button>
            <button onClick={() => {this.state.btn = 20; this.state.page = 0; this.componentDidMount()}}>20</button>
            <button onClick={() => {Math.ceil(lastUserId / this.state.btn) > this.state.page+1 ? this.state.page++ : alert('last page'); this.componentDidMount()}}>Next page</button>
            <ul>{this.getUserList()}</ul>
            </div>

    }

    getUserList() {
        return this.state.list.map((user, index) => {
            return <User  key = {index} user={user}/>
        })
    }
}