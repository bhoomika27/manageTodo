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
    updateCheckBox:''

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
    case 'EDIT_TASK':
        return state= editFromList(state,action.todo);
    case 'SET_EDITED_LIST':
          return state= setEditedList(state,action.todo);
          
        
    default:
      return state
  }
}

const setFieldsValue=(state,name,value)=>{
  console.log(name,value)
  state={
    ...state,
    [name]:value
  }
  return state
}
const setCheckboxValue=(state,name,value)=>{
  console.log(name,value)
  state={
    ...state,
    [name]:value
  }
  return state
}
const updateCheckboxValue=(state,name,checked,id)=>{
  console.log(name,checked,id)
  console.log(state)
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
  console.log(tasklist)
  console.log(state)
  state={
    ...state,
    todos:[...state.todos,tasklist]
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

console.log(todo)
console.log(state)
  var tasks =state.todos.filter((task)=>{
    console.log(task.id ,"wowwwww",todo.id)
    return task.id!==todo.id
  })

  state={
    ...state,
    todos:tasks
  }
console.log(state.todos)
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