const express = require('express');
const image_api = require('./REST/image');
const dbConnectionFactory = require('./db/connection');
const app = express();
const PORT = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Protocols', '*');

    next();
}

app.use(allowCrossDomain);
dbConnectionFactory(app);
app.use(image_api);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));