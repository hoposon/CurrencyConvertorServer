

const express = require('express');
const bodyParser = require('body-parser');




var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());



app.listen(port,() => {
    console.log(`Started on port ${port}`);
});