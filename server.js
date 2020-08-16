var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var cheeseController = require("./controllers/cheese")
var userController = require("./controllers/user")
var photoController = require("./controllers/photo")
var postController = require("./controllers/post")
var passport = require("passport")
var authController = require("./controllers/auth")
var config = require("./config")
var jwt = require("jsonwebtoken")
var fs = require("fs")
var multer = require("multer")
var path = require("path")

mongoose.connect(config.database)

var app = express()

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/post", function (req, res) {
  res.sendFile(__dirname + "/views/post.html")
})

app.set("superSecret", config.secret)

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(bodyParser.json())

app.use(passport.initialize())

app.use(express.static("public"))

var router = express.Router()

router.route("/post").post(postController.postPost).get(postController.getPosts)

router
  .route("/post/:post_id")
  .get(postController.getPost)
  .delete(postController.deletePost)
  .put(postController.putPost)

router
  .route("/upload")
  .post(photoController.postPhotos)
  .get(photoController.getPhotos)
  .delete(photoController.deletePhoto)

router.route("/upload/:post_id").get(photoController.getPostPhoto)

router
  .route("/cheeses")
  .post(authController.isAuthenticated, cheeseController.postCheeses)
  .get(authController.isAuthenticated, cheeseController.getCheeses)

router
  .route("/cheeses/:cheese_id")
  .get(authController.isAuthenticated, cheeseController.getCheese)
  .put(authController.isAuthenticated, cheeseController.putCheese)
  .delete(authController.isAuthenticated, cheeseController.deleteCheese)

router
  .route("/users")
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers)

router
  .route("/users_token")
  .get(authController.isAuthenticated, userController.token)

router
  .route("/accept_token")
  .get(userController.accept_token, cheeseController.getCheeses_token)

router
  .route("/post_token")
  .post(userController.accept_token, cheeseController.postCheeses_token)

app.use("/api", router)

app.listen(3000)
