 var User = require('../models/user');
 var jwt = require('jsonwebtoken');
 var mongoose = require('mongoose');
 var express = require('express');
 var bodyParser = require('body-parser');
 var app = express();

 app.use(bodyParser.urlencoded({
     extended: false
 }));

 app.use(bodyParser.json());

 exports.postUsers = function(req, res) {

     User.find({ username: req.body.username }, function(err, user) {

         if (err) {
             res.json("cannot create user");
         }

         if (!(user == 0)) {

             res.json("user existed");

         } else {

             var user = new User({
                 username: req.body.username,
                 password: req.body.password
             });

             user.save(function(err) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'New beer drinker added to the locker room!' });
             });

         }

     });


 };



 exports.getUsers = function(req, res) {
     User.find(function(err, users) {
         if (err)
             res.send(err);

         res.json(users);
     });
 };


 exports.echo = function(req, res) {
     console.log(decoded);
 };


 exports.token = function(req, res, app) {

     var token = jwt.sign(req.user.id, 'superSecret', {
         expiresInMinutes: 1440
     });

     res.json({
         success: true,
         message: 'Enjoy your token!',
         token: token
     });

 };

 exports.accept_token = function(req, res, next) {

     var token = req.body.token || req.query.token || req.headers['x-access-token'];

     if (token) {

         jwt.verify(token, 'superSecret', function(err, decoded) {
             if (err) {
                 return res.json({ success: false, message: 'Failed to authenticate token.' });
             } else {

                 req.decoded = decoded;
                 console.log(decoded);
                 next();
             }
         });

     } else {

         return res.status(403).send({
             success: false,
             message: 'No token provided.'
         });

     }

 };
