const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {   
    db.db('star-wars-crud').collection('quotes').find().toArray(function(err, result) {
        if (err) return console.log(err)

        res.render('index.ejs', {quotes: result})
    })    
})

app.post('/quotes', (req, res) => {
    db.db('star-wars-crud').collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

var db

MongoClient.connect('mongodb://jonathan:glbk32@ds133597.mlab.com:33597/star-wars-crud', (err, database) => {
    if (err) return console.log(err);

    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000')
    })  
})