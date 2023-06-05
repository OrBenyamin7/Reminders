import { createContext, useReducer } from 'react'

export const TaskContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }

        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }

        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id )
            }

            case 'UPDATE_TASK':
                const updatedTaskIndex = state.tasks.findIndex((t) => t._id === action.payload._id)
              
                if (updatedTaskIndex !== -1) {
                  const updatedTasks = [...state.tasks];
                  updatedTasks[updatedTaskIndex] = action.payload;
              
                  return {
                    tasks: updatedTasks
                  }
                }
                break

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