import React from 'react'
import UserActions from "./actions/UserActions";

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editForm: false,
            email: props.user.email,
            x: 0,
            y: 0,
            error: false
        };
        this.staticListener = (e) => this.listenMouseMove(e);
    }

    componentDidMount() {
        console.log("user componentDidMount");
        this.isMount = true
        window.addEventListener('mousemove', this.staticListener)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const out = this.state.email !== nextState.email || this.state.editForm !== nextState.editForm;
        console.log("user shouldComponentUpdate: " + out);
        return out;
    }

    render() {
        if(this.state.error) {
            return <div>Error occurred</div>
        }
        return <li ref={ref => this.li = ref}>
            {this.state.editForm ?
                <input value={this.state.email}
                       onChange={(e) => this.updateEmail(e)} /> :
                <span onClick={() => this.setState({editForm: true})}>{this.state.email}</span>
            }
            <a href="#" onClick={() => this.editForm()}>Edit</a>
            <a href="#" onClick={() => this.deleteUser()}>Delete</a>
            <a href="#" onClick={() => this.saveUser()}>Save</a>
        </li>;
    }
    getSnapshotBeforeUpdate() {
        console.log('user getSnapshotBeforeUpdate');

        return this.li.getBoundingClientRect();
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        console.log('user componentDidUpdate');
        console.log(snapshot, this.li.getBoundingClientRect())
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.staticListener)
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({error: true});
    }

    editForm() {
        this.setState({editForm: true});
    }

    saveUser() {
        this.setState(
            {editForm: false},
            () => UserActions.createUser({
                id: this.props.user.id,
                email: this.state.email
            })
        )
    }

    updateEmail(event) {
        this.setState({email: event.target.value});
    }

    deleteUser() {
        UserActions.deleteUserById(this.props.user.id);
    }

    listenMouseMove(e) {
        console.log("listen" + this.props.user.id)
        this.setState({x: e.clientX, y: e.clientY});
    }


}