import { useState } from 'react'
import { useTasksContext } from "../hooks/useTasksContext"

const TaskEdit = ({ task, onClose }) => {
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedDueDate, setEditedDueDate] = useState(task.due_date)

  const { dispatch } = useTasksContext()

  const handleChangeDescription = (e) => {
    setEditedDescription(e.target.value)
  };

  const handleChangeDueDate = (e) => {
    setEditedDueDate(e.target.value)
  };

  const handleSave = async () => {

    const response = await fetch('/api/tasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: editedDescription,
        due_date: editedDueDate
      })
    })

    const json = await response.json()

    console.log('***********')
    console.log(json)
    //console.log(response)

    if (response.ok) {
      console.log('here')
      dispatch({ type: 'UPDATE_TASK', payload: json })
      onClose() 
    } else {
      console.error('Failed to update the task')
    }
}

  const handleDelete = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
        method: 'DELETE'
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
