import React, { PureComponent } from 'react'
import './addList.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Checkbox from 'react-simple-checkbox';
import Select from "react-select";
import * as actionsTodo from '../actions/actionsTodo'


var counter=0;
class AddList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            today:null,
            // taskStatus:false

        }
        this.handleCheckbox=this.handleCheckbox.bind(this);
    }
    static getDerivedStateFromProps(props, state){
       
        return null;
      
        
    }
    componentDidMount(){
       
        this.interval = setInterval(() => {
        if(this.props.todoApp.dueDate===undefined){this.getDate();}
     }, 1000);

        fetch(' https://my-json-server.typicode.com/bhoomika27/todoData/users')
                .then(response => response.json())
                .then(json => {this.props.setUserData(json);
                console.log(json)})
        fetch(' https://my-json-server.typicode.com/bhoomika27/todoData/todos')
                .then(response => response.json())
                .then(json => {this.props.setUserTodos(json);
                    console.log(json)
                counter = json.length})

    }

    addItem(){
            
        this.props.setCheckboxValue("addFlag",true)
    }
    handleSubmit=(e)=>{

        e.preventDefault();      
        counter+=1;
        var userId=parseInt(this.props.todoApp.userId,10);
        console.log(counter ,userId)
        this.props.setTaskList(counter,userId );
        this.props.setCheckboxValue("addFlag",false);
    }

    handleInputValues =(e)=>{
        this.props.setFieldsValue(e.target.name,e.target.value)        
    }
 

    getDate=()=>{
        var today= new Date().toJSON().split('T')[0];
        this.setState({today:today})
    }
    handleEditList=()=>{
        this.props.setEditedList();
    }
    handleEditTask=(e,todo,i)=>{
        console.log("I want to be edited")
        this.props.editTask(todo,i);
 
     }
    updateCheckbox=(e,id)=>{
        console.log(e.target.name ,e.target.checked ,id)
        this.props.updateCheckboxValue(e.target.name ,e.target.checked ,id)
    }
    handleDeleteTask=(e,todo)=>{
        console.log(e.target.value ,todo)
        this.props.deleteTask(todo);
        }
    handleCheckbox =(e)=>{
        this.props.setCheckboxValue(e.target.name,e.target.checked) 
        // this.setState({[e.target.name]:e.target.checked})
    }
    render() {
        const usersData = this.props.todoApp.data;
        return (
            <div id="container">
                <div id="userDropdownDiv" className="userDropdownDiv">
                <h1 id="todoHeading" className="todoHeading">User Todos List!!</h1>
                <div className="statusDiv">
                <select id="status" name="userId" value={this.props.todoApp.userId} className="dropdownSelect" onChange={this.handleInputValues}>
                    <option value="default" disabled selected>Select User</option>
                    {Object.values(this.props.todoApp.data).map((user ,i)=>{
                    return <option key={i} value={user.id}>{user.name}</option>
                    })}
                </select>
                </div>
           
                {this.props.todoApp.edit? <button className="addBtn" onClick={this.handleEditList}>SAVE CHANGES</button>:''}
                </div>
     
                { this.props.todoApp.todos && this.props.todoApp.userId &&
                <div className="todoContainer">
                    <div className="todoBtnDiv">
                        <label className="todosListBtn">Todos</label>
                        <label className="historyTodoBtn">History</label>
                        <label className="addTodoBtn" onClick={() => this.addItem()}>Add Todos</label>
                    </div>
                        {this.props.todoApp.addFlag &&
                        <div className="addTodosDiv">
                        <input type="checkbox" name="taskStatus" className="userTodosCheckBox" onChange={this.handleCheckbox} checked={this.props.todoApp.taskStatus}></input>
                        <input className="addItemInput" name="title" onChange={this.handleInputValues}></input>
                        <img src="./images/cancel.svg" alt="Not Found" className="deleteBtn"/>
                        <label className="updateTodoLbl" onClick={this.handleSubmit}>Add</label>
                        </div>}
               
                        <div>
                    {/* { this.props.todoApp.todos &&  */}
                        { Object.values(this.props.todoApp.todos).map((user,i)=>{
                            console.log(this.props.todoApp.userId)
                            if(this.props.todoApp.userId==user.userId){
                                // console.log(user)
                                return (<div className="userTodosDiv">
                                            <input type="checkbox" name="taskStatus" className="userTodosCheckBox" onChange={(e)=>this.updateCheckbox(e,user.id)} checked={user.completed} />
                                            {/* <input type="text" name="" key={user.userId} value={user.title} onChange={(e)=>handleEditTask(e,e.target.value ,item.key)}/> */}
                                            <p>{user.title} </p>
                                            <img src="./images/cancel.svg" alt="Not Found"  className="deleteBtn"  onClick={(e)=>this.handleDeleteTask(e,user)} />
                                            <label className="updateTodoLbl">Update</label>
                                            </div>)
                                        }
                                    })
                        }
                        </div>
             
                </div>
    }
               
            </div>

        )}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFieldsValue:actionsTodo.setFieldsValue,
        setCheckboxValue:actionsTodo.setCheckboxValue,
        setUserData:actionsTodo.setUserData,
        setUserTodos:actionsTodo.setUserTodos,
        setTaskList:actionsTodo.setTaskList,
        setEditedList:actionsTodo.setEditedList,
        deleteTask:actionsTodo.deleteTask,
        updateCheckboxValue:actionsTodo.updateCheckboxValue
    },dispatch)
};
const mapStateToProps = (state) => {
    return {
        todoApp: state.todoApp
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddList);

	/*todo : check input is not blank*/
        /*todo : check user dropdown  is not blank*/
       
        // let title = document.getElementById("addItem").value;
        // console.log(title)
		//     let value = this.state.selectedOption.value;
		   
		//     fetch('https://my-json-server.typicode.com/bhoomika27/todoData/todos', {
		//     method: 'POST',
		//     body: JSON.stringify({
		//       title: title,
		//       userId: value
		//     }),
		//     headers: {
		//       "Content-type": "application/json; charset=UTF-8"
		//     }
		//   })
		//   .then(response => response.json())
		//   .then(json => {console.log(json);
		//   	document.getElementById("addItem").value = '';})