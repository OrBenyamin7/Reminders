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
                console.log(action.payload)
                const updatedTaskIndex = state.tasks.findIndex((t) => t._id === action.payload._id)
                console.log(updatedTaskIndex)
                console.log('//')
                if (updatedTaskIndex !== -1) {
                  const updatedTasks = [...state.tasks]
                  console.log(updatedTasks)
                  updatedTasks[updatedTaskIndex] = {
                    ...updatedTasks[updatedTaskIndex], // Merge existing task data
                    ...action.payload, // Merge updated task data
                  };
              
                  //console.log(action.payload)
                  console.log('/')
                  console.log(updatedTasks)
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