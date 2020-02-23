import { combineReducers } from 'redux';
import todoApp from './todoReducer'

const rootReducer = combineReducers({
    todoApp:todoApp
})

export default rootReducer