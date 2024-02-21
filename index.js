const express = require('express');
require('express-async-errors');
const errorHandler = require("./middleware/errorHandler");

const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Consenti solo questi metodi HTTP
    allowedHeaders: ['Content-Type', 'Authorization'] // Consenti solo questi header
}));

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", require("./routes/index.route"));

app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});