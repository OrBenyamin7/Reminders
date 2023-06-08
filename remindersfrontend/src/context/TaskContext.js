import { createContext, useReducer } from 'react'

export const TaskContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                //tasks: action.payload
                //tasks: action.payload.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))

                tasks: action.payload.sort((a, b) => {
                    const dateA = new Date(a.due_date)
                    const dateB = new Date(b.due_date)
                    const currentDate = new Date()
              
                    // Compare the due dates and times
                    if (dateA < dateB) {
                      return -1
                    }
                    if (dateA > dateB) {
                      return 1
                    }
              
                    // Due dates and times are equal, sort based on whether they are in the past or future
                    if (dateA < currentDate && dateB < currentDate) {
                      return dateB - dateA // Sort in descending order (newest to oldest)
                    }
                    if (dateA > currentDate && dateB > currentDate) {
                      return dateA - dateB // Sort in ascending order (nearest to farthest)
                    }
              
                    // Handle one task in the past and the other in the future
                    // Tasks in the past will be prioritized and placed at the beginning of the array
                    if (dateA < currentDate && dateB > currentDate) {
                      return -1
                    }
                    if (dateA > currentDate && dateB < currentDate) {
                      return 1
                    }
              
                    // Handle equal dates and times
                    return 0
                  })
            }

        case 'CREATE_TASK':
            const newTask = action.payload

            // Create a new array with the new task added
            const updatedTasks = [newTask, ...state.tasks]
        
            // Sort the tasks array based on the same sorting logic as in the 'SET_TASKS' case
            updatedTasks.sort((a, b) => {
                const dateA = new Date(a.due_date)
                const dateB = new Date(b.due_date)
                const currentDate = new Date()
            
                if (dateA < dateB) {
                    return -1
                }
                if (dateA > dateB) {
                    return 1
                }
                if (dateA < currentDate && dateB < currentDate) {
                    return dateB - dateA
                }
                if (dateA > currentDate && dateB > currentDate) {
                    return dateA - dateB
                }
                if (dateA < currentDate && dateB > currentDate) {
                    return -1
                }
                if (dateA > currentDate && dateB < currentDate) {
                    return 1
                }
        
                return 0
            })
        
            return {
                tasks: updatedTasks
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