import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import TaskEdit from '../components/TaskEdit'

const TaskDetails = ({ task }) => {
    const [showModal, setShowModal] = useState(false)


    const handleEdit = () => {
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
    };

    return (
        <div className="task-details">
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
    );
};

export default TaskDetails
