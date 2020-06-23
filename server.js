const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Config
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(db, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/reports', require('./routes/api/reports'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server started on port: ${port}`));