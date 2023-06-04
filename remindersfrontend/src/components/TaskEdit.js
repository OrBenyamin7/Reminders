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

  const handleDelete = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch({ type: 'DELETE_TASK', payload: task._id });
    }
};

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
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>

        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
