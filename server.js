const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const path = require('path');
const mongoose = require('mongoose');
//const urlDb = 'mongodb://host.docker.internal:27017/config';
const urlDb = 'mongodb://mongo:27017/samplesDataStorage';
const routers = require('./views');
//const controllers = require('./controlers');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.set('etag', false);
// app.use(routers.LoginRouter);
// app.use('/users*', controllers.LoginController.verifyUser);
app.use(["/dev", "/qa"], routers.SamplesRouter);

mongoose.connect(urlDb, {
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err, connection) => {
    if (err) console.log(err);
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listen on port: '${port}`));
    process.on('SIGINT', () => {
        console.log("Close process");
        connection.close();
        process.exit();
    });
});

module.exports = app;