
import { useState } from 'react'

//import { useTasksContext } from "../hooks/useTasksContext"
//import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import TaskEdit from '../components/TaskEdit'



const TaskDetails = ({task}) => {
    //const {dispatch } = useTasksContext()
    //const { user } = useAuthContext()
    
    const [showModal, setShowModal] = useState(false)

    const handleEdit = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    /*
    //hagar
    const handleClick = async () => {
        if (!user) {
          return
        }
      }   
      */

    const isTaskPastDue = (new Date(task.due_date) < new Date()) && (task.due_date);


    return (
        <div className={`task ${isTaskPastDue ? 'task-details-past-due' : 'task-details'}`}>
            <h4>{task.description}</h4>
            {task.due_date !== null && (
                <p><strong>Due date: </strong>{formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</p>
            )}            
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>

            {/* Modal for editing task details */}
            {showModal && (
                <TaskEdit
                    task={task}
                    onClose={closeModal}
                />
            )}
        </div>
    )
}

export default TaskDetails
