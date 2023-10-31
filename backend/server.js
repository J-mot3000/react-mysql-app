const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Password1!', // Replace with your MySQL password
  database: 'db-conn-example', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON
app.use(bodyParser.json());

// CRUD routes
// Create (POST)
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';

  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Error creating task' });
    } else {
      res.status(201).json({ message: 'Task created' });
    }
  });
});

// Read (GET)
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).json({ error: 'Error retrieving tasks' });
    } else {
      res.json(results);
    }
  });
});

// Update (PUT)
app.put('/api/tasks/:id', (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';

  db.query(query, [title, description, taskId], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Error updating task' });
    } else {
      res.json({ message: 'Task updated' });
    }
  });
});

// Delete (DELETE)
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const query = 'DELETE FROM tasks WHERE id = ?';

  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Error deleting task' });
    } else {
      res.json({ message: 'Task deleted' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
