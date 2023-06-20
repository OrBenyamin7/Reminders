import { useState } from "react"
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'


const TaskForm = () => {
    const { dispatch} = useTasksContext()
    const { user } = useAuthContext()

    const [description, setDescription] = useState('')
    const [due_date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])




    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!user) {
          setError('You must be logged in')
          return
        }
        const userId = user.userId
        const reminde_me = false
        const sync_myTask = false
        const task = {description, due_date, reminde_me, sync_myTask, userId}

        const response = await fetch('https://reminders-km7j.onrender.com/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })

        const json = await response.json()

        //console.log('json file')
        //console.log(json)

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setDescription('')
            setDate('')
            setError('')
            setEmptyFields([])
            //console.log('new task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <div className = "wrapper">
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Task</h3>

                <div className="input-box">
                    <label>Task description</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className={emptyFields.includes('description') ? 'error' : ''}
                    />
                </div>

                <div className="input-box">
                    <label>Task dueDate</label>
                    <input
                        type="Date"
                        onChange={(e) => setDate(e.target.value)}
                        value={due_date}
                        min={today}
                    />
                </div>

                <button>Add Task</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default TaskForm