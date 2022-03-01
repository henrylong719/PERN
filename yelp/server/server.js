const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//  get all restaurants
app.get('/api/v1/restaurants', async (req, res, next) => {
  try {
    const result = await db.query(`
    SELECT * FROM restaurants
  `);
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
      req.params.id,
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// create a restaurant
app.post('/api/v1/restaurants', async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;

    console.log(name, location, price_range);

    const result = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *',
      [name, location, price_range]
    );

    res.status(201).json({
      status: 'success',
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// update restaurants

app.put('/api/v1/restaurants/:id', async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;

    const result = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [name, location, price_range, req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// delete restaurants
app.delete('/api/v1/restaurants/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      'DELETE FROM restaurants WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    res.status(204).json({
      status: 'success',
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
