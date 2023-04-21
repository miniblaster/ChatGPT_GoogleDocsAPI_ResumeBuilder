const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config() ;

const openaiRouter = require('./router/openai');
const googledocsRouter = require('./router/googledocs');
const createfile = require('./router/createfile');

// Express Configuration
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 
app.use('/openai', openaiRouter);
app.use('/googledocs', googledocsRouter);
app.use('/createfile', createfile);


// Start the server
app.listen(process.env.PORT, () => {
	console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});