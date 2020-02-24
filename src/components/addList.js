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
            addFlag: false,
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
                console.log(json)})

    }
    addItem(){
        this.setState({addFlag:true})
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

    }
    handleSubmit=(e)=>{

        e.preventDefault();
        counter+=1;
        this.props.setTaskList(counter);
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
    handleCheckbox =(e)=>{
        console.log(e.target.checked ,e.target.name)
        this.props.setCheckboxValue(e.target.name,e.target.checked) 
        // this.setState({[e.target.name]:e.target.checked})
    }
    render() {
        console.log(this.props.todoApp.data)
        console.log(this.props.todoApp.todos)
        const usersData = this.props.todoApp.data;
        return (
            <div id="container">
                <div id="userDropdownDiv" className="userDropdownDiv">
                <h2 id="todoHeading" className="todoHeading">Users TODO List!!</h2>
                <div className="statusDiv">
                <label className="titleLabel" htmlFor="business">Status</label>
                <select id="status" name="status" value={this.props.todoApp.status} className="business" onChange={this.handleInputValues}>
                    <option value="default" disabled selected>Select your option</option>
                    {Object.values(this.props.todoApp.data).map((user ,i)=>{
                    return <option key={i} value={user.id}>{user.name}</option>
                    })}
                </select>
                </div>
                {/* <div className="titleDiv">
                <label className="titleLabel" >Title</label>
                <input type="text" id="title" maxLength="50" name="title" className="title" placeholder="Enter Title" 
                value={this.props.todoApp.title} onChange={this.handleInputValues}></input>
                </div> */}
           
                {this.props.todoApp.edit? <button className="addBtn" onClick={this.handleEditList}>SAVE CHANGES</button>:''}
                
                <button type="submit" className="addBtn" onClick={this.handleSubmit}>SHOW TODO TASK</button>
                </div>
     

                <div className="todoContainer">
                    <div className="todoBtnDiv">
                    <label className="todosListBtn">Todos</label>
                    <label className="historyTodoBtn">History</label>
                    <label className="addTodoBtn" onClick={() => this.addItem()}>Add Todos</label>
                </div>
                {this.state.addFlag &&
                 <div className="addTodosDiv">
                 <input type="checkbox" name="taskStatus" className="userTodosCheckBox" onChange={this.handleCheckbox} checked={this.props.todoApp.taskStatus}></input>
                 <input></input>
                 <img src="./images/cancel.svg" alt="Not Found" className="deleteBtn"/>
                 <label className="updateTodoLbl">Add</label>
                 </div>}
               
                <div>
            { this.props.todoApp.todos && 
                  Object.values(this.props.todoApp.todos).map((user,i)=>{
                      console.log(user)
                      if(this.props.todoApp.status==user.userId){
                          return (<div className="userTodosDiv">
                                    <Checkbox className="userTodosCheckBox" checked={user.completed}/>
                                    <p>{user.title}</p>
                                    <img src="./images/cancel.svg" alt="Not Found" className="deleteBtn"/>
                                    <label className="updateTodoLbl">Update</label>
                                    
                                     {/* onClick={(e)=>this.handleDeleteTask(e,todo) */}
                                    </div>)
                      }
                  })
                }
                </div>
             
                </div>
                
               
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFieldsValue:actionsTodo.setFieldsValue,
        setCheckboxValue:actionsTodo.setCheckboxValue,
        setUserData:actionsTodo.setUserData,
        setUserTodos:actionsTodo.setUserTodos,
        setTaskList:actionsTodo.setTaskList,
        setEditedList:actionsTodo.setEditedList
    },dispatch)
};
const mapStateToProps = (state) => {
    return {
        todoApp: state.todoApp
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddList);