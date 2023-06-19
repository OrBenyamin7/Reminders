const Task = require('../models/tasksModel')
const mongoose = require('mongoose')


// get all user tasks
const getUserTasks = async (req, res) => {
    const { userId } = req.params
    
    const tasks = await Task.find({userId}).sort({createdAt: -1})

    res.status(200).json(tasks)
}


// taskController.js

const getUserSharedTasks = async (req, res) => {
    try {
        const { userId } = req.params
    
        const tasks = await Task.find({userId}).sort({createdAt: -1})
      
      // Find all tasks where the secondUserEmail matches the user's email
      //const sharedTasks = await Task.find({ secondUserEmail: userEmail });
      
      res.status(200).json(sharedTasks);
    } catch (error) {
      console.error('Error retrieving shared tasks:', error);
      res.status(500).json({ message: 'Error retrieving shared tasks' });
    }
  };
 
  module.exports = {
    getUserSharedTasks,
  };
  




// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}


// get a single task
const getTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }


    const task = await Task.findById(id)

    if(!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}


// create new task

const createTask = async(req, res) => {
    const {description, due_date, reminde_me, sync_myTask, userId} = req.body


    let emptyFields = []

    if(!description) {
        emptyFields.push('description')
    }

    //add another if checks of must fields to enter

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try {
        const task = await Task.create({description, due_date, reminde_me, sync_myTask, userId})
        res.status(200).json(task)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}


//delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      )

    


    if(!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)

}

module.exports = {
    getUserTasks,
    getUserSharedTasks,
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}