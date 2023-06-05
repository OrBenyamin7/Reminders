import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const TaskDetails = ({task}) => {
    const {dispatch } = useTasksContext()
    const { user } = useAuthContext()

    //hagar
    const handleClick = async () => {
        if (!user) {
          return
        }
    
        const response = await fetch('/api/tasks/' + task._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_TASKS', payload: json})
        }
      }


    const handleDelete = async () => {
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    const handleEdit = async () => {
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'PATCH'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_TASK', payload: json})
        }
    }

    return (
        <div className="task-details">
            <h4>{task.description}</h4>
            <p><strong>dueDate: </strong>{formatDistanceToNow(new Date(task.due_date), {addSuffix: true})}</p>
            <p>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default TaskDetails