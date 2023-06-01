import { TaskContext } from "../context/TaskContext"
import { useContext } from "react"

export const useTasksContext = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw Error('useTasksContext must be used inside an tasksContextProvider')
    }

    return context
}