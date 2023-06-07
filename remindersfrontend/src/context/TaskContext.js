import { createContext, useReducer } from 'react'

export const TaskContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }

        case 'CREATE_TASK':
            console.log('here5435435432543')
            console.log(action.payload)
            return {
                tasks: [action.payload, ...state.tasks]
            }

        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id )
            }

        case 'UPDATE_TASK':
            return {
                tasks: state.tasks.map((task) => 
                    task._id === action.payload._id ? action.payload : task
                )
            }

        default:
            return state
    }
}

export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <TaskContext.Provider value={{...state, dispatch}}>
            { children }
        </TaskContext.Provider>
    )
}