const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const parserLimit = { limit: "10mb" }

//env config
require('dotenv').config();

const index = require("./routes/index");
const email = require("./routes/route.email");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json(parserLimit));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 10000,
}));

app.use(
    session({
        key: 'userId',
        secret: 'subscribe',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 4,
        },
    })
)
app.use("/", index);
app.use("/api/v1/email", email);

if (process.env.NODE_ENV === 'test') {
    //listen port
    app.listen(process.env.PORT, () => {
        console.log('API Server');
        console.log('SERVER Status: Running');
        console.log('Running port: ' + process.env.PORT);
    })
}

module.exports = app;