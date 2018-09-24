const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const routes = require('./app.routes');

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/medium'