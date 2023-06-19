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
router.get('/:userId',getUserTasks)

//GET All Reminders that shared with the user
router.get('/:getUserSharedTasks', getUserSharedTasks);

module.exports = router;





//GET All Reminders
router.get('/',getTasks)

//GET a single workout
router.get('/:id',getTask)

//POST a new Reminder
router.post('/',createTask)

//DELETE Reminder
router.delete('/:id',deleteTask)

//UPDATE a Reminder
router.patch('/:id',updateTask)



module.exports = router