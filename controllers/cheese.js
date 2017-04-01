var Cheese = require('../models/cheese');

exports.postCheeses = function(req, res) {

    var cheese = new Cheese();

    cheese.name = req.body.name;
    cheese.type = req.body.type;
    cheese.quantity = req.body.quantity;
    cheese.userId = req.user._id;


    cheese.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Cheese added to the locker!', data: cheese });
    });
};


exports.getCheeses = function(req, res) {

    Cheese.find({ userId: req.user._id }, function(err, cheeses) {
        if (err)
            res.send(err);

        res.json(cheeses);
    });
};


exports.getCheese = function(req, res) {

    Cheese.find({ userId: req.user._id, _id: req.params.cheese_id }, function(err, cheese) {
        if (err)
            res.send(err);

        res.json(cheese);
    });
};


exports.putCheese = function(req, res) {

    Cheese.update({ userId: req.user._id, _id: req.params.cheese_id }, { quantity: req.body.quantity }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' updated' });
    });
};


exports.deleteCheese = function(req, res) {

    Cheese.remove({ userId: req.user._id, _id: req.params.cheese_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Cheese removed from the locker!' });
    });
};



exports.getCheeses_token = function(req, res) {

    Cheese.find({ userId: req.decoded }, function(err, cheeses) {
        if (err)
            res.send(err);

        res.json(cheeses);
    });
};



exports.postCheeses_token = function(req, res) {

    var cheese = new Cheese();

    cheese.name = req.body.name;
    cheese.type = req.body.type;
    cheese.quantity = req.body.quantity;
    cheese.userId = req.decoded;


    cheese.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Cheese added to the locker!', data: cheese });
    });
};
