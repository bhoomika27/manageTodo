import React, { PureComponent } from 'react'
import './addList.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsTodo from '../actions/actionsTodo'


var counter=0;
class AddList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            today:null

        }
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
    
    handleSubmit=(e)=>{

        e.preventDefault();
        counter+=1;
        this.props.setTaskList(counter);
    }

    handleInputValues =(e)=>{
        console.log(e.target.name,e.target.value)
        this.props.setFieldsValue(e.target.name,e.target.value)        
    }

    getDate=()=>{
        var today= new Date().toJSON().split('T')[0];
        this.setState({today:today})
    }
    handleEditList=()=>{
        this.props.setEditedList();
    }
       
    render() {
        console.log(this.props.todoApp.data)
        console.log(this.props.todoApp.todos)
        const usersData = this.props.todoApp.data;
        return (
            <div id="container">
                <div>
                <h2 id="todoHeading" className="todoHeading">Your TODO Bucket!!</h2>
                <div className="statusDiv">
                <label className="titleLabel" htmlFor="business">Status</label>
                <select id="status" name="status" value={this.props.todoApp.status} className="business" onChange={this.handleInputValues}>
                    <option value="default" disabled selected>Select your option</option>
                    {Object.values(this.props.todoApp.data).map((user ,i)=>{
                    return <option key={i} value={user.id}>{user.name}</option>
                    })}
                </select>
                </div>
                <div className="titleDiv">
                <label className="titleLabel" >Title</label>
                <input type="text" id="title" maxLength="50" name="title" className="title" placeholder="Enter Title" 
                value={this.props.todoApp.title} onChange={this.handleInputValues}></input>
                </div>
           
                {this.props.todoApp.edit? <button className="addBtn" onClick={this.handleEditList}>SAVE CHANGES</button>:''}
                
                <button type="submit" className="addBtn" onClick={this.handleSubmit}>SHOW TODO TASK</button>
                </div>
     

                <div className="todoContainer">
               
                { this.props.todoApp.todos && 
                  Object.values(this.props.todoApp.todos).map((user,i)=>{
                      if(this.props.todoApp.status==user.userId){
                          return <p>{user.title}</p>
                      }
                  })
                }
                </div>
                
               
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFieldsValue:actionsTodo.setFieldsValue,
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