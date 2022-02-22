const express = require('express')
const pool = require('../lib/db')
const route = express.Router()

// Get all todos
route.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// Get a todo
route.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.log(err.message)
  }
})

// Create a todo
route.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    )
    res.json(newTodo.rows[0])
  } catch (err) {
    console.log('Create todo: ', err.message)
  }
})

// Update todo
route.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    )
    res.json('Todo was updated')
  } catch (err) {
    console.log(err.message)
  }
})

// Delete todo
route.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ])
    res.json('Todo was deleted!')
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = route
