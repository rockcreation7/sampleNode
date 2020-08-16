var Post = require("../models/post")

exports.postPost = function (req, res) {
  var post = new Post()

  post.title = req.body.title
  post.des = req.body.des
  post.content = req.body.content
  post.photo = req.body.photo

  post.save(function (err) {
    if (err) res.send(err)

    res.json({ message: "Post added!", data: post })
  })
}

exports.getPosts = function (req, res) {
  Post.find(
    {},
    null,
    {
      sort: {
        created_a: -1,
      },
    },
    function (err, posts) {
      if (err) res.send(err)

      res.json(posts)
    }
  )
}

exports.getPost = function (req, res) {
  Post.find({ _id: req.params.post_id }, function (err, post_detail) {
    if (err) res.send(err)

    res.json(post_detail)
  })
}

exports.deletePost = function (req, res) {
  Post.remove({ _id: req.params.post_id }, function (err) {
    if (err) res.send(err)

    res.json({ message: "Post removed" })
  })
}

exports.putPost = function (req, res) {
  Post.update(
    { _id: req.params.post_id },
    {
      title: req.body.title,
      des: req.body.des,
      content: req.body.content,
      photo: req.body.photo,
    },

    function (err, num, raw) {
      if (err) res.send(err)

      res.json({ message: num + " updated" })
    }
  )
}
