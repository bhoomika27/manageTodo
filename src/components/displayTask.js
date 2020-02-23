import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';
import Popup from "reactjs-popup";

class DisplayTask extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            // displayModal:false
        }
    }

    handleDeleteTask=(e,todo)=>{
        console.log(e ,todo)
        this.props.deleteTask(todo);
        }

    handleEditTask=(e,todo,i)=>{
       console.log("I want to be edited")
       this.props.editTask(todo,i);

    }
    render() {
        console.log(this.props.todoApp.tasklist)
        return (
            <div>
               

                {this.props.todoApp.tasklist !==null ||this.props.todoApp.tasklist ===undefined?
                    (this.props.todoApp.tasklist.map((todo,i)=>{
                        console.log(todo)
                        return(<div key={i} id="displayTask" className="displayTask">
                        {/* <img src="./images/download.png" alt="Not Found" className="deleteBtn" onClick={(e)=>this.handleDeleteTask(e,todo)}/> */}
                        <p className="taskTitle">{todo.title}</p>
                        <label className="taskStatus">Status :{todo.status}</label>
                        <button id="deleteBtn" className="deleteBtn" onClick={(e)=>this.handleDeleteTask(this,todo)}>Delete</button>
                        <button id="editBtn" className="editBtn" onClick={(e)=>this.handleEditTask(e,todo,i)}><a id="editLink"
                        href="#container">Edit</a></button>  
                    </div>)
                    })):''}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todoApp: state.todoApp
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteTask:actionsTodo.deleteTask,
        editTask:actionsTodo.editTask,
    },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(DisplayTask)

 {/* {<Popup trigger={<button> Trigger</button>} position="right center">
                    <div>Popup content here !!</div>
                    </Popup>} */}