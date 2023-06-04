import { useTasksContext } from "../hooks/useTasksContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const TaskDetails = ({task}) => {
    const {dispatch } = useTasksContext()

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
        /*
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'PATCH'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_TASK', payload: json})
        }
                    <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>

        */
       if(task.due_date == null){
        console.log("null date")
       }
    }

    return (
        <div className="task-details">
            <h4>{task.description}</h4>
            {task.due_date !== null && (
                <p><strong>dueDate: </strong>{formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</p>
            )}            
            <p>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default TaskDetails