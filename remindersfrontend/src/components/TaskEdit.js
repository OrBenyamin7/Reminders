import { useState } from 'react'
import { useTasksContext } from "../hooks/useTasksContext"

import { useAuthContext } from '../hooks/useAuthContext'


const TaskEdit = ({ task, onClose }) => {
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedDueDate, setEditedDueDate] = useState(task.due_date)
  const [editedPriority, setEditedPriority] = useState(task.priority)
  const [editedSharedEmail, setSecondEmail] = useState(task.secondUserEmail)



  const { dispatch } = useTasksContext()

  const { user } = useAuthContext()

  const handleChangeDescription = (e) => {
    setEditedDescription(e.target.value)
  }

  const handleChangeDueDate = (e) => {
    setEditedDueDate(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setSecondEmail(e.target.value);
  }

  const handleSave = async () => {

    if (editedDescription.trim() === '') {
      console.error('Description cannot be empty')
      return;
    }

    const response = await fetch('/api/tasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        description: editedDescription,
        due_date: editedDueDate,
        priority: editedPriority,
        secondUserEmail: editedSharedEmail,
      })
    })

    const userId = user.userId
      const secondResponse = await fetch('/api/tasks/' + userId, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const secondJson = await secondResponse.json()

      if (secondResponse.ok) {
        dispatch({type: 'SET_TASKS', payload: secondJson})
      }

    
    const json = await response.json()


    if (response.ok) {
      dispatch({ type: 'UPDATE_TASK', payload: json })
      onClose() 
    } else {
      console.error('Failed to update the task')
    }
}

  const handleDelete = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    if (response.ok) {
        dispatch({type: 'DELETE_TASK', payload: json})
        console.log('task was delete')
    }
    else{
        console.error('Failed to delete the task')
    }
}
const today = new Date().toISOString().split('T')[0]


  return (
    <div className="modal-overlay">
      <div>
        <h4 className="headLineEditTask">Details</h4>
        <div className="description-input">
          <strong>Description: </strong>
          <input
            type="text"
            value={editedDescription}
            onChange={handleChangeDescription}
          />
        </div>
        <div className="due-date-input">
          <strong>Due date: </strong>
          <input
            type="Date"
            defaultValue={editedDueDate ? editedDueDate.slice(0, 10) : ''}
            onChange={handleChangeDueDate}
            min={today}
          />
        </div>

        <div className="priority-input">
          <strong>Priority: </strong>
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="shareTaskInput">
          <strong>Share with: </strong>
          <input
            type="email"
            value={editedSharedEmail}
            onChange={handleChangeEmail}
          />
        </div>

        <div className="modal-buttons">
          <button className="btnEditTask" onClick={onClose}>Cancel</button>
          <button className="btnEditTask" onClick={handleSave}>Save</button>
          <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
      </div>
    </div>
  )
}

export default TaskEdit