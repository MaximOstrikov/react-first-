import React from 'react'
import UserActions from './actions/UserActions'
import User from './User'

let btn = 0;
let page = 0;
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log(btn + ' ' + page);
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
            <button onClick={() => {page--; this.componentDidMount()}}>Previous page</button>
            <button onClick={() => {btn = 5; this.componentDidMount()}}>5</button>
            <button onClick={() => {btn = 10; this.componentDidMount()}}>10</button>
            <button onClick={() => {btn = 20; this.componentDidMount()}}>20</button>
            <button onClick={() => {page++; this.componentDidMount()}}>Next page</button>
            <ul>{this.getUserList()}</ul>
            </div>

    }

    getUserList() {
        return this.state.list.map((user, index) => {
            return <User  key = {index} user={user}/>
        })
    }
}