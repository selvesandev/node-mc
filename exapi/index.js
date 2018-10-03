const express = require('express');
const Joi = require('joi');
const app = express();
const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: true})); //with extended true you can pass complex data like arrays from the request

app.use(function (req, res, next) {
    next();
});


app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error);
    }
    res.send(req.body);
});


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});