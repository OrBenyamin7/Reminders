import { useState } from "react"
import { useTasksContext } from '../hooks/useTasksContext'


const TaskForm = () => {
    const { dispatch} = useTasksContext()

    const [description, setDescription] = useState('')
    const [due_date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])




    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {description, due_date}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setDescription('')
            setDate('')
            setError(null)
            setEmptyFields([])
            console.log('new task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Task dueDate</label>
            <input
                type="Date"
                onChange={(e) => setDate(e.target.value)}
                value={due_date}
            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm