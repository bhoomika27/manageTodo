import * as actionTypes from '../actions/actionsTodo'

const initialState = {
    tasklist:[],
    data:'',
    todos:'',
    id:0,
    title:'',
    desc:'',
    status:"default",
    edit:false,
    taskStatus:false,
    addFlag: false,
    updateCheckBox:'',
    updateTodoId:'',
    history:[]

  };
function todoApp(state = initialState, action) {
    
  switch (action.type) {
    case 'ADD_FIELD_VALUE':
        return state= setFieldsValue(state,action.name,action.value);
    case 'ADD_CHECKBOX_VALUE':
        return state= setCheckboxValue(state,action.name,action.value);        
    case 'ADD_USERS_DATA':
        return state= setUserData(state,action.data);
    case 'ADD_USERS_TODOS':
        return state= setUserTodos(state,action.data);          
    case 'ADD_TASK':
        return state= setTodoList(state,action.tasklist,action.userId);
    case 'DELETE_TASK':
        return state= deleteFromList(state,action.todo);
    case 'UPDATE_CHECKBOX':
        return state= updateCheckboxValue(state,action.name,action.checked,action.id);
    case 'UPDATE_TASK':
          return state= setUpdatedList(state,action.tasklist,action.userId, action.title,action.completed);
          
        
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
const setCheckboxValue=(state,name,value)=>{
 
  state={
    ...state,
    [name]:value
  }
  return state
}
const updateCheckboxValue=(state,name,checked,id)=>{

  state={
    ...state,
    [name]:checked
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


const setTodoList=(state,counter,userId)=>{
  const tasklist = {userId:userId, id:counter,title: state.title,completed:state.taskStatus};
  state={
    ...state,
    todos:[...state.todos,tasklist]
  }
return state
}

const setUpdatedList=(state,id,userId, title,completed)=>{
  let todo=state.todos.slice(0)
  todo.map((task,i)=>{
 if(task.id===id){
   
   task.completed=completed;
   task.title=title;
   state.history=[...state.history,task]
 }
  })
  state={
    ...state,
    todos:[...state.todos],
    updateTodoId:id,
  }
return state
}

const deleteFromList=(state,todo)=>{

  var tasks =state.todos.filter((task)=>{
    return task.id!==todo.id
  })

  state={
    ...state,
    todos:tasks
  }
  return state
}


export default todoApp