import * as actionTypes from '../actions/actionsTodo'

const initialState = {
    tasklist:[],
    data:'',
    todos:'',
    id:0,
    title:'',
    desc:'',
    status:"default",
    today:null,
    edit:false,
    days:0

  };


function todoApp(state = initialState, action) {
    
  switch (action.type) {
    case 'ADD_FIELD_VALUE':
        return state= setFieldsValue(state,action.name,action.value);
    case 'ADD_USERS_DATA':
        return state= setUserData(state,action.data);
    case 'ADD_USERS_TODOS':
        return state= setUserTodos(state,action.data);          
    case 'ADD_TASK':
        return state= setTodoList(state,action.tasklist);
    case 'DELETE_TASK':
        return state= deleteFromList(state,action.todo,action.index);
    case 'EDIT_TASK':
        return state= editFromList(state,action.todo);
    case 'SET_EDITED_LIST':
          return state= setEditedList(state,action.todo);
    case 'SET_DATE_FIELD':
          return state= setDateField(state,action.name,action.value,action.days);    
          
        
    default:
      return state
  }
}

const setFieldsValue=(state,name,value)=>{
  state={
    ...state,
    [name]:value
  }
  return state
}
const setUserData=(state,data)=>{
  state={
    ...state,
    data:data
  }
  return state
}
const setUserTodos=(state,data)=>{
  state={
    ...state,
    todos:data
  }
  return state
}

const setDateField=(state,name,value,days)=>{
  state={
    ...state,
    [name]:value,
    days:days
  }
  return state
}

const setTodoList=(state,counter)=>{
  const tasklist = {id:counter,title: state.title,status:state.status};
  state={
    ...state,
    tasklist:[...state.tasklist,tasklist]
  }
return state
}
const setEditedList=(state)=>{
  const tasklist=[...state.tasklist];
  tasklist[state.id-1]={id:state.id,title: state.title,status:state.status};

  state={
    ...state,
    edit:false,
    tasklist:tasklist
  }
return state
}

const deleteFromList=(state,todo)=>{


  var tasks =state.tasklist.filter((task)=>{
    return task.id!==todo.id
  })

  state={
    ...state,
    tasklist:tasks
  }

return state
}





const editFromList=(state,todo,i)=>{

  state={
    ...state,
    id:todo.id,
    title:todo.title,
    desc:todo.description,
    status:todo.status,
    edit:true
  }
return state
}



export default todoApp