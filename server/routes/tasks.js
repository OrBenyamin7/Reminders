const express = require('express')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/tasksControllers')

const router = express.Router()


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