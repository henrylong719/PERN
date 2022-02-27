const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
