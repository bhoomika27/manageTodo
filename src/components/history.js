import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';

class History extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name:''
        }
    }
    render() {
       console.log(this.props.todoApp.userId)
        return (
            <div className="HistoryDiv">
                {
                        this.props.todoApp.data.map((user,i)=>{
                            if(user.id===parseInt(this.props.todoApp.userId,10)){
                                console.log("Hii I am here")
                               this.setState({name:user.name})
                            } 
                        })
                }
            {console.log(this.props.todoApp.history)}
                {this.props.todoApp.history !=="" || this.props.todoApp.history ===undefined ?
                 (this.props.todoApp.history.map((his,i)=>{
                 console.log(his)
                 if(his.userId===parseInt(this.props.todoApp.userId,10)){
                    var taskStatus=his.completed?"Done":"Pending";
                    return(<p> {this.state.name} has changed status to {taskStatus} for #Todo {his.title} </p>)
                 }
                 
                 })):""
                 }
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

export default connect(mapStateToProps,mapDispatchToProps)(History)
