import React from 'react'
import UserActions from './actions/UserActions'
import User from './User'
import users from '../database/users'

let btn = 0;
let page = 0;
let lastUserId = users.lastId;

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log("component did mount");
        UserActions.loadList(
            {skip: page*btn, pageSize: btn},
            (list) => {
                this.setState({list})
            }
        );
    }

    render() {
        return <div>
            <button onClick={() => {page > 0 ? page-- : alert('first page'); this.componentDidMount()}}>Previous page</button>
            <button onClick={() => {btn = 5; page = 0; this.componentDidMount()}}>5</button>
            <button onClick={() => {btn = 10; page = 0; this.componentDidMount()}}>10</button>
            <button onClick={() => {btn = 20; page = 0; this.componentDidMount()}}>20</button>
            <button onClick={() => {Math.ceil(lastUserId / btn) > page+1 ? page++ : alert('last page' + lastUserId + ' ' + btn +' '+ page); this.componentDidMount()}}>Next page</button>
            <ul>{this.getUserList()}</ul>
            </div>

    }

    getUserList() {
        return this.state.list.map((user, index) => {
            return <User  key = {index} user={user}/>
        })
    }
}