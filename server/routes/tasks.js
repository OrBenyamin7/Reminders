const express = require('express')
const {
    getUserTasks,
    getUserSharedTasks,
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/tasksControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//GET All Reminders of single user
router.get('https://reminders-km7j.onrender.com/:userId',getUserTasks)




//GET All Reminders that shared with the user
router.get('https://reminders-km7j.onrender.com/shareTask/:mail',getUserSharedTasks)




//GET All Reminders
router.get('https://reminders-km7j.onrender.com/',getTasks)

//GET a single workout
router.get('https://reminders-km7j.onrender.com/:id',getTask)

//POST a new Reminder
router.post('https://reminders-km7j.onrender.com/',createTask)

//DELETE Reminder
router.delete('https://reminders-km7j.onrender.com/:id',deleteTask)

//UPDATE a Reminder
router.patch('https://reminders-km7j.onrender.com/:id',updateTask)



module.exports = router