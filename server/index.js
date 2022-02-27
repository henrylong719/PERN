const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(express.json());
app.use(cors());

// ROUTES //

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1)',
      [description]
    );

    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
