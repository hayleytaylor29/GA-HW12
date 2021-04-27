const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
const captLogs = require('./models/logs.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/captlogs', {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
app.use(methodOverride('_method'));
//index route
app.get('/logs/', (req, res) => {
    captLogs.find({}, (err, allLogs) => {
    res.render('index.ejs', {
        captLogs: allLogs
        })
    })
})
// new route
// app.get('/logs', (req, res) => {
//     res.send('new')
// })
// route for rendering new.ejs at /logs
app.get('/logs/new', (req, res) => {
    res.render('new.ejs');
})
//route for show.ejs
app.get('/logs/:indexLogArray', (req, res) => {
    captLogs.find({}, (err, allLogs) => {
        res.render('show.ejs', {
            captLogs: allLogs[req.params.indexLogArray]
        })
    })
//route for rendering the show.ejs
app.get('/logs/:id', (req, res) => {
    captLogs.findById(req.params.id, (err, foundLog) => {
        res.render('show.ejs', {
            captlogs: foundLog
        })
    })
})
        
})
//create route
app.post('/logs', (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    captLogs.create(req.body, (error, createdLog) => {
        res.redirect('show.ejs')
    });
})
//DELETE
app.delete('/logs/:id', (req, res) => {
    //remove the item from the array
    captLogs.findOneAndRemove(req.params.id);
    //redirect back to index route
    res.redirect('/logs')
})

app.listen(3000, () => {
    console.log('listening');
})