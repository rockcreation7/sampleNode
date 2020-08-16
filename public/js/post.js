// Demo Only 
$(document).ready(function () {
  var post_id = "577abd1c8d8efd9a04d887a1"
  var post_photo = []
  var d_inited = 0
  var apiUrl = "http://127.0.0.1:3000/"

  function updatepostId() {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {

        $(".new_post_id").html(post_id)
        $(".create_post div").fadeIn()

        var data = JSON.parse(this.response)

        $(".post_title").val(data[0].title)
        $(".post_des").val(data[0].des)
        $(".post_content").val(data[0].content)
        $(".post_photo").val(data[0].path)

        post_photo = data[0].photo

        if (d_inited == 1) {
          Dropzone.forElement("#upload-widget").destroy()
          init_d()
        } else {
          init_d()
          d_inited = 1
        }

        console.log(data[0].photo.length)

        for (var i = 0; i <= data[0].photo.length - 1; i++) {
          var str = ""

          str += '<div class="item">'
          str += '<img src="../uploads/' + data[0].photo[i].id + '"/>'
          str += "</div>"

          $(".selected_photo").prepend(str)
        }

        $(".post_photo_pre").html("")

        get_post_image()
      }
    })
    // for
    xhr.open("GET", apiUrl + "api/post/" + post_id)
    xhr.setRequestHeader("cache-control", "no-cache")
    xhr.send()
  }

  $(".all_post").on("click", ".item", function () {
    var the_curr_id = $(this).attr("class").split(" ")[1]
    console.log(the_curr_id)
    post_id = the_curr_id
    updatepostId()
  })

  function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) {
        return true
      }
    }
    return false
  }

  $(".post_photo_pre").on("click", ".item", function () {
    var the_image_name = $(this).attr("class").split(" ")[1]
    var the_image_name_id = $(this).attr("class").split(" ")[2]
    if (post_photo == "") {
      post_photo = [{ id: the_image_name, path: the_image_name_id }]
    } else {
      if (!contains(post_photo, the_image_name)) {
        post_photo.push({ id: the_image_name, path: the_image_name_id })
      }
    }

    console.log(post_photo)
  })

  $(".new_post").on("click", function () {
    createnewpostId()
  })

  function createnewpostId() {
    var post_title = $(".post_title").val()
    var post_des = $(".post_des").val()
    var post_content = $(".post_content").val()
    var data = JSON.stringify({
      content: post_content,
      des: post_des,
      title: post_title,
      photo: post_photo,
    })

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var jsonResponse = JSON.parse(this.responseText)
        $(".post_photo").val(post_photo)

        post_id = jsonResponse.data._id
        post_photo = jsonResponse.data.photo
        console.log(post_photo)

        $(".new_post_id").html(post_id)
        $(".create_post div").fadeIn()

        if (d_inited == 1) {
          Dropzone.forElement("#upload-widget").destroy()
          init_d()
        } else {
          init_d()
          d_inited = 1
        }
      }
    })

    xhr.open("POST", apiUrl + "api/post/")
    xhr.setRequestHeader("content-type", "application/json")
    xhr.setRequestHeader("cache-control", "no-cache")

    xhr.send(data)
  }

  function init_d() {
    $("#upload-widget").dropzone({
      // previewTemplate: document.getElementById('upload-widget').innerHTML,
      url: "api/upload",
      paramName: "file",
      maxFilesize: 0.1, // MB
      maxFiles: 5,
      dictDefaultMessage: "Drop files here",
      headers: { postid: post_id },
      acceptedFiles: "image/*",
      init: function () {
        this.on("success", function (file, resp) {})
        this.on("complete", function (file) {
          if (
            this.getUploadingFiles().length === 0 &&
            this.getQueuedFiles().length === 0
          ) {
            $(".dz-preview").delay(5000).fadeOut()
            get_post_image()
          }
        })

        this.on("drop", function () {
          var _this = this

          _this.removeAllFiles()
        })
      },
    })
  }

  $(".add_photo").on("click", function () {})

  $(".submit_post").on("click", function () {
    createpost()
  })

  function createpost() {
    var post_title = $(".post_title").val()
    var post_des = $(".post_des").val()
    var post_content = $(".post_content").val()
    console.log(post_photo)
    var data = JSON.stringify({
      content: post_content,
      des: post_des,
      title: post_title,
      photo: post_photo,
    })
    console.log(data)

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
      }
    })

    xhr.open("PUT", apiUrl + "api/post/" + post_id)
    xhr.setRequestHeader("content-type", "application/json")
    xhr.setRequestHeader("cache-control", "no-cache")

    xhr.send(data)
  }

  $(".delete_post").on("click", function () {
    deletepost()
  })

  function deletepost() {
    var post_id = $(".post_id").val()

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        get_post_image()
      }
    })

    xhr.open("DELETE", apiUrl + "api/post/" + post_id)
    xhr.setRequestHeader("content-type", "application/json")
    xhr.setRequestHeader("cache-control", "no-cache")

    xhr.send()
  }

  var xhr = new XMLHttpRequest()
  xhr.withCredentials = true

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText)

      for (var i = 0; i <= data.length - 1; i++) {
        var str = ""

        str +=
          '<div class="item ' +
          data[i]._id +
          " " +
          data[i].title +
          " " +
          data[i].des +
          '">'

        str += " " + data[i]._id + "</div>"

        $(".all_post").prepend(str)
      }
    }
  })

  xhr.open("GET", apiUrl + "api/post/")
  xhr.setRequestHeader("cache-control", "no-cache")
  xhr.send()

  function get_post_image() {
    var settings = {
      async: true,
      crossDomain: true,
      url: apiUrl + "api/upload/" + post_id,
      method: "GET",
      cache: false,
    }

    $.ajax(settings).done(function (response) {
      var obj = response
      $(".ab").html("")

      $.each(obj, function (index, value) {
        var str = ""
        str +=
          '<img class="item ' +
          value.name +
          " " +
          value._id +
          '" src="../uploads/' +
          value.name +
          '">'

        $(".post_photo_pre").prepend(str)
      })
    })
  }

  function get_all_image() {
    var settings = {
      async: true,
      crossDomain: true,
      url: apiUrl + "api/upload",
      method: "GET",
    }

    $.ajax(settings).done(function (response) {
      var obj = response
      $(".ab").html("")

      $.each(obj, function (index, value) {
        var str = ""
        str +=
          '<div class="item ' +
          value.name +
          " " +
          value._id +
          '" style="background-image:url(../uploads/' +
          value.name +
          ')">'
        str += "</div>"

        $(".ab").prepend(str)
      })
    })
  }

  get_all_image()

  tinymce_plugin()
  tinymce_plugin_2()

  function tinymce_plugin() {
    tinymce.PluginManager.add("example", function (editor, url) {
      editor.addButton("example", {
        text: "My button",
        icon: false,
        onclick: function () {
          editor.insertContent(
            '<table class="col_wrap"><tbody><tr><td class="col_1_2">Content</td>' +
              '<td class="col_1_2">Content</td></tr></tbody></table>'
          )
        },
      })

      editor.addMenuItem("example", {
        text: "Example plugin",
        context: "tools",
        onclick: function () {
          editor.windowManager.open({
            title: "TinyMCE site",
            url: "http://www.tinymce.com",
            width: 800,
            height: 600,
            buttons: [
              {
                text: "Close",
                onclick: "close",
              },
            ],
          })
        },
      })
    })
  }

  function tinymce_plugin_2() {
    tinymce.PluginManager.add("example_2", function (editor, url) {
      editor.addButton("example_2", {
        text: "My button 2",
        icon: false,
        onclick: function () {
          editor.insertContent(
            '<p class="col_wrap"><p class="col_1_2">content</p><p class="col_1_2">content</p></p>'
          )
        },
      })

      editor.addMenuItem("example_2", {
        text: "Example_2 plugin",
        context: "tools",
        onclick: function () {
          editor.windowManager.open({
            title: "TinyMCE site",
            url: "http://www.tinymce.com",
            width: 800,
            height: 600,
            buttons: [
              {
                text: "Close",
                onclick: "close",
              },
            ],
          })
        },
      })
    })
  }
})
