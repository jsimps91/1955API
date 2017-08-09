var mongoose = require('mongoose');
var Person = mongoose.model('Person');
module.exports = {
    show_all: function(req, res){
        Person.find({}, function(err, people){
            res.render('index', { 'people': people})
        })
        
    },
    create: function(req, res){
        var person = new Person({ name: req.params.name});
        person.save(function(err){
            if(err){
                console.log("there was a problem adding person to db")
            }
            else{
                console.log("added ", req.params.name)
                res.redirect('/')
            }
        })
    },
    delete: function(req, res){
        Person.remove({ name: req.params.name}, function (err){
            if(err){
                console.log("there was a problem removing person from db")
            }
            else{
                console.log("removed ", req.params.name)
                res.redirect('/')
            }
        })
    },
    show_one: function(req, res){
        Person.find({name: req.params.name}, function(err, person){
            if(err){
                console.log("could not find ", req.params.name)
            }
            else{
                res.json({'person': person})
            }
        })
    }
}