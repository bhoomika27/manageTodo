import React, { PureComponent } from 'react'
import './addList.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import History from './history';
import * as actionsTodo from '../actions/actionsTodo'


var counter = 0;
class AddList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            today: null,
            checkbox: false,
            showHistory: false,
            showTodos: true

        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    static getDerivedStateFromProps(props, state) {

        return null;


    }
    componentDidMount() {

        fetch(' https://my-json-server.typicode.com/bhoomika27/todoData/users')
            .then(response => response.json())
            .then(json => {
                this.props.setUserData(json);
                console.log(json)
            })
        fetch(' https://my-json-server.typicode.com/bhoomika27/todoData/todos')
            .then(response => response.json())
            .then(json => {
                this.props.setUserTodos(json);
                counter = json.length
            })

    }

    addItem() {

        this.props.setCheckboxValue("addFlag", true)
    }

    handleCancel() {
        this.props.setCheckboxValue("addFlag", false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        counter += 1;
        var userId = parseInt(this.props.todoApp.userId, 10);
        this.props.setTaskList(counter, userId);
        this.props.setCheckboxValue("addFlag", false);


    }

    handleInputValues = (e) => {
        this.props.setFieldsValue(e.target.name, e.target.value)      
    }
    handleDeleteTask = (e, todo) => {
        console.log(e.target.value, todo)
        this.props.deleteTask(todo);
    }

    handleUpdateTask = (e, todo) => {
        console.log(todo)
        document.getElementById('updateBtn_' + todo.id).style.display = 'none';
        let checkval = this.state['updateCheckbox_' + todo.id] !== undefined ? this.state['updateCheckbox_' + todo.id] : todo.completed;
        console.log(checkval, this.state['updateCheckbox_' + todo.id])
        console.log(document.getElementById('update_' + todo.id).value)
        let val1 = document.getElementById('update_' + todo.id).value !== '' ? document.getElementById('update_' + todo.id).value : todo.title;
        console.log(val1)
        e.preventDefault();

        var userId = parseInt(this.props.todoApp.userId, 10);
        console.log(todo.id, userId, val1, checkval)
        this.props.updateTaskList(todo.id, userId, val1, checkval);
        this.props.setCheckboxValue("addFlag", false);
        let val = document.getElementById('update_' + todo.id).value;
        console.log(val)
        // document.getElementById('title_'+ todo.id).innerHTML = val;
        document.getElementById('inputUpd_' + todo.id).style.display = 'none';
        document.getElementById('title_' + todo.id).style.display = 'inline-block';
    }

    showInputBar = (e, todo) => {
        document.getElementById('title_' + todo.id).style.display = 'none';
        document.getElementById('inputUpd_' + todo.id).style.display = 'inline-block';
        document.getElementById('updateBtn_' + todo.id).style.display = 'inline-block';
    }
    updateCheckbox = (e, todo) => {
        this.setState({ ['updateCheckbox_' + todo.id]: e.target.checked })
        document.getElementById('userCheckbox_' + todo.id).style.display = 'none';
        document.getElementById('updateCheckbox_' + todo.id).style.display = 'inline-block';
        document.getElementById('updateBtn_' + todo.id).style.display = 'inline-block';
    }
    updateLocalCheckbox = (e, todo) => {
        document.getElementById('updateBtn_' + todo.id).style.display = 'inline-block';
        this.setState({ ['updateCheckbox_' + todo.id]: e.target.checked })

    }
    showHistory = () => {
        this.setState({
            showHistory: !this.state.showHistory,
            showTodos: !this.state.showTodos
        })
    }
    showTodos = () => {
        this.setState({
            showHistory: false,
            showTodos: true
        })
    }
    handleCheckbox = (e) => {
        this.props.setCheckboxValue(e.target.name, e.target.checked)
    }
    render() {
      
        return (
            <div id="container">
                <div id="userDropdownDiv" className="userDropdownDiv">
                    <h1 id="todoHeading" className="todoHeading">User Todos List!!</h1>
                    <div className="statusDiv">
                        <select id="status" name="userId" value={this.props.todoApp.userId} className="dropdownSelect" onChange={this.handleInputValues}>
                            <option value="default" disabled selected>Select User</option>
                            {Object.values(this.props.todoApp.data).map((user, i) => {
                                return <option key={i} value={user.id}>{user.name}</option>
                            })}
                        </select>
                        {
                            console.log(this.props.todoApp.data)
                        }
                        {this.props.todoApp.userId !== undefined && (
                        <div>
                            {this.props.todoApp.data.map((detail, i) => {
                                console.log(detail.userId,parseInt(this.props.todoApp.userId,10))
                                if (detail.id === parseInt(this.props.todoApp.userId,10)) {
                                    return (<div className="infoDetail">
                                        <p>Username:{detail.username}</p>
                                        <p>Email:{detail.email}</p>
                                        <p>Phone:{detail.phone}</p>
                                       
                                    </div>)
                                }

                            })
                            }

                        </div>)}
                    </div>
                </div>

                {this.props.todoApp.todos && this.props.todoApp.userId &&
                    <div className="todoContainer">
                        <div className="todoBtnDiv">
                            <label className="todosListBtn" onClick={this.showTodos}>Todos</label>
                            <label className="historyTodoBtn" onClick={() => this.showHistory()}>History</label>
                            <label className="addTodoBtn" onClick={() => this.addItem()}>Add Todos</label>
                        </div>
                        {this.state.showHistory && <History />}
                        {this.props.todoApp.addFlag &&
                            <div className="addTodosDiv">
                                <input type="checkbox" name="taskStatus" className="userTodosCheckBox" onChange={this.handleCheckbox} checked={this.props.todoApp.taskStatus}></input>
                                <input className="addItemInput" placeholder='Enter Todo' name="title" onChange={this.handleInputValues}></input>
                                <label className="addTodoLbl" onClick={this.handleSubmit}>Add New Todo</label>
                                <label className="addTodoLbl cancelTodo" onClick={() => this.handleCancel()}>Cancel</label>
                            </div>}
                        {this.state.showTodos &&
                            <div className="todosDiv">
                                {
                                    Object.values(this.props.todoApp.todos).map((user, i) => {

                                        if (this.props.todoApp.userId == user.userId) {
                                            let checkboxStatus = `userCheckbox_${user.id}`
                                            let checkboxUpdate = `updateCheckbox_${user.id}`
                                            let classNameUser = `userTodosDiv_${user.id}`;
                                            let title = `title_${user.id}`;
                                            let inputUpdate = `update_${user.id}`;
                                            let outerUp = `inputUpd_${user.id}`
                                            let updateBtn = `updateBtn_${user.id}`
                                            return (<div className={classNameUser}>
                                                <input id={checkboxStatus} type="checkbox" className="userTodosCheckBox dib" onChange={(e) => this.updateCheckbox(e, user)} checked={user.completed} />
                                                <input id={checkboxUpdate} type="checkbox" className="userTodosCheckBox dn dib" onChange={(e) => this.updateLocalCheckbox(e, user)} checked={this.state[checkboxUpdate]} />
                                                <p id={title} className='dib' onClick={(e) => this.showInputBar(e, user)} >{user.title}</p>
                                                <div id={outerUp} className='dn dib'><input id={inputUpdate} placeholder='Update value' /></div>
                                                <div className='updatePnl'>
                                                    <label id={updateBtn} className="updateTodoLbl" onClick={(e) => this.handleUpdateTask(e, user)}>Update</label>
                                                    <img src="./images/cancel.svg" alt="Not Found" className="deleteBtn" onClick={(e) => this.handleDeleteTask(e, user)} />
                                                </div>
                                            </div>)
                                        }
                                    })
                                }
                            </div>
                        }
                    </div>
                }

            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFieldsValue: actionsTodo.setFieldsValue,
        setCheckboxValue: actionsTodo.setCheckboxValue,
        setUserData: actionsTodo.setUserData,
        setUserTodos: actionsTodo.setUserTodos,
        setTaskList: actionsTodo.setTaskList,
        updateTaskList: actionsTodo.updateTaskList,
        deleteTask: actionsTodo.deleteTask,
        updateCheckboxValue: actionsTodo.updateCheckboxValue
    }, dispatch)
};
const mapStateToProps = (state) => {
    return {
        todoApp: state.todoApp
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
