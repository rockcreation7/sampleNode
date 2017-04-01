var Photo = require('../models/photo');
var fs = require("fs");
var multer = require('multer');
var bodyParser = require('body-parser');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 500000 }
}).single('file', 5);


exports.postPhotos = function(req, res) {

    upload(req, res, function(err) {

        if (err) {
            return res.end("Error uploading file.");
        }

        var photo = new Photo();

        photo.name = req.file.filename;

        photo.org_name = req.file.originalname;

        photo.postid = req.headers.postid;

        console.log(req.headers.postid);

        photo.save(function(err) {
            if (err)
                res.send(err);
            return res.json({ message: 'Photo added!', data: photo });
        });


    });

};


exports.getPhotos = function(req, res) {

    Photo.find(function(err, photos) {
        if (err)
            res.send(err);

        res.json(photos);
    });

};


exports.getPostPhoto = function(req, res) {


    Photo.find({ postid: req.params.post_id }, function(err, photos) {
        if (err)
            res.send(err);
        console.log(photos)
        res.json(photos);
    });
};


exports.deletePhoto = function(req, res) {


    var a = req.body.id;
    var b = req.body.name;

    console.log(a);

    Photo.find({ _id: a }, function(err, obj) {

        if (err) {
            return res.send("cannot del photo");
        }





        if (obj.length) {

            var file_name_cur = obj[0].name;


            console.log(obj[0].name);

            Photo.remove({ _id: a }, function(err) {
                if (err)
                    res.send(err);
                return res.json({ message: 'photo removed from the locker!' });
            });

            fs.unlink(process.cwd() + "/public/uploads/" + file_name_cur);



        } else {

            return res.send("cannot del photo");

        }



    });


};
