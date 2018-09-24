// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

function getBase64(file, onLoadCallback) {
  return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}
// hiển thị edit 
$(document).on('click', ".option", function() {
  $(this).next().show()
});

//tắt bảng edit
$(".option-menu").click(function(event){
  event.stopPropagation();
  $(".option-menu").hide();
})

$(document).ready(function(){  
  $("span.glyphicon.glyphicon-thumbs-up").attr("aria-hidden", "true")

  $(".view-react").css({"display": "none"})

  $('.hide-post').css({"display": "none"})

  $('.hide-share').css({"display": "none"})

  $(".comment-area").css({"display": "none"})

  $('.form_share').css({'display':'none'})
  $(document).on('click', '.request-area', function(){
    $(this).find('.option-response').show()
  })

  $(".container").mouseup(function(e){
    var subject = $(".option-response");
    if(e.target.class != subject.attr("class")){
      subject.hide();
     
    }
  })

  // close view post
  $(document).on('click','.close-view span', function(e){
    debugger
    $('.container').css({'opacity':'1'});
    $('body').css({'overflow':'scroll'})
    $('.hide-share').css({'display':'none'})
    $(this).closest('.close-view').next().css({'display':'none'})
    $(this).css({'display':'none'})
    $(this).closest('.hide-post').css({'display':'none'})
  })

  // close view share
  $(document).on('click','.close-view-share span', function(e){
    debugger
    $('.container').css({'opacity':'1'});
    $('body').css({'overflow':'scroll'})
    $('.hide-share').css({'display':'none'})
    $(this).closest('.close-view').next().css({'display':'none'})
    $(this).css({'display':'none'})
    $(this).closest('.hide-share').css({'display':'none'})
  })

  $(document).on('click', ".option", function() {
    $(this).next().show()
  });

  $( document ).on( 'focus', ':input', function(){
    $( this ).attr( 'autocomplete', 'off' );
  });
  
  $(".container").mouseup(function(e){
    var subject = $(".option-menu");
    if(e.target.class != subject.attr("class")){
      subject.hide();
    }
  })

  $(document).on('click', '.fa-comments-o', function(){
    $(this).next(".comment-area").toggle();
  })
  
  // tạo bài viết
  $(document).on('submit', "#new_post",async function(event){
    event.preventDefault();  
    var count_file = $("input:file")[0].files.length;
    var params_picture = "";
    var a  = [];
    if (count_file){
      for(var i = 0; i < count_file; i++){
        var file = $("#file_button").prop('files')[`${i}`];
        var base64_data = "";
        if(file != " "){
          var promise = getBase64(file);
          var base64_data = await promise;
          var b = `${i}`;
          var c =  '"' + b + '"' + ':{"picture_url":' + '"' + base64_data + '"}';
          a.push(c);
        };
      }
      params_picture = a.join(",");
      params_picture = '{'+ params_picture +'}';
      action = $(this).attr('action');
      method = $(this).attr('method');
      content = $(this).find('textarea').val();

      $.ajax({
        // async: false,
        type: method,
        url: window.location.origin +"/"+action,
        data: { post: {content: content, pictures_attributes: JSON.parse(params_picture)}},
        dataType: 'html',
        success: function(data){
          $(':input.post_form').prop('disabled', false);
          $('.posts').prepend(data);
          $('#post_content').val('');
        },
      });
    }
    else{
      action = $(this).attr('action');
      method = $(this).attr('method');
      content = $(this).find('textarea').val();
      $.ajax({
        // async: false,
        type: method,
        url: window.location.origin +"/"+action,
        data: { post: {content: content}},
        dataType: 'html',
        success: function(data){
          $(':input.post_form').prop('disabled', false);
          $('.posts').prepend(data);
          $('#post_content').val('');
        },
      });
    }
  });

  // sửa bài viết
  $(document).on('submit','.edit_post', async function(e){
    e.preventDefault();
    var count_file = $(this).find("input:file").length;
    var params_picture = "";
    var a  = [];
    debugger
    for(var i = 0; i < count_file; i++){
      var picture_id = $(this).find(`input[name='post[pictures_attributes][${i}][id]']`).val();
      var file = $(this).find(`input[name='post[pictures_attributes][${i}][picture_url]']`).prop('files')[0];
      var base64_data = "";
      if(file){
        var promise = getBase64(file);
        var base64_data = await promise;
        var b = `${i}`;
        var c =  '"' + b + '"' + ':{"picture_url":' + '"' + base64_data + '", "id":"'+ picture_id + '"}';
        a.push(c);
      };
    }
    params_picture = a.join(",");
    params_picture = '{'+ params_picture +'}'
    var action = $(this).attr("action");
    var method = $(this).attr("method");
    var update_content = $(this).find("input#post_content").val();
    $.ajax({
      url: window.location.origin +"/"+action,
      method: "PUT",
      data: { post: {content: update_content, pictures_attributes: JSON.parse(params_picture)}},
      dataType: 'html',
    }).success(function(data){
      $(this).html(data);
    }.bind(this))
  })

  //xóa bài viết
  $(document).on('click', '.destroy-post', function(event){
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url: window.location.origin +"/"+"/posts/" + id,
      method: "DELETE",
      processData: true,
    }).success(function() {
      ($(this).closest(".option-area")).next(".content_item").remove();
    }.bind(this))
  });

  //tạo comment
  $(document).on('submit', ".new_comment", function(e){
    e.preventDefault();
    action = $(this).attr('action');
    method = $(this).attr('method');
    content = $(this).find('input.comment_textbox').val();
    $.ajax({
      type: method,
      url: window.location.origin +"/"+action,
      data: { comment: {content: content}},
      dataType: 'html',
    }).success(function(data){
      $(':input[type="submit"]').prop('disabled', false);
      $(this).parent().html(data);    
      ($(this).children("input")).val('');
    }.bind(this));
  });

  //xóa comment
  $(document).on('click', '.destroy-comment', function(event){
    event.preventDefault();
    var post_id = $(this).attr('post-id');
    var id = $(this).data("id");
    $.ajax({
      url: window.location.origin +"/"+"posts/" + post_id + "/comments/" + id,
      method: "DELETE",
      processData: true,
    }).success(function() {
      ($(this).closest(".comment_detail")).remove();
    }.bind(this))
  });

  // form bài viết
  $(document).on('click', '.edit-post', function(event){
    event.preventDefault();
    debugger  
    // $(".post-area").hide();
    var post_id = $(this).data("id");
    $.ajax({
      url: window.location.origin +"/"+"posts/" + post_id + "/edit",
      method: "GET",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).closest(".option-area").next(".content_item").find(".content").html(data)
    }.bind(this))
  });

  //hiển thị form sửa comment
  $(document).on('click', '.edit-comment', function(e){
    event.preventDefault();
    var comment_id = $(this).data("id"); 
    var post_id = $(this).attr("post-id");
    $.ajax({
      url: window.location.origin +"/"+"posts/" + post_id + "/comments/" + comment_id  + "/edit",
      method: "GET",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).parent().prev().find("span").html(data)
    }.bind(this))
  })

  //sửa comment
  $(document).on('submit','.edit_comment', function(e){
    e.preventDefault();
    var action = $(this).attr('action');
    var method = $(this).attr('method');
    var update_comment = $(this).find("input#comment_content").val();
    $.ajax({
      url: window.location.origin +"/"+action,
      method: "PUT",
      data: {comment: {content: update_comment}},
      dataType: 'json',
    }).success(function(data){
      $(this).html("<span>"+data.content+"</span>");
    }.bind(this))
  })

  // like
  $(document).on('submit', ".new_like", function(e){
    e.preventDefault();
    var action = $(this).attr('action');
    var method = $(this).attr('method');
    $.ajax({
      url: window.location.origin +"/"+action,
      method: method,
      data: {like: {status: "like"}},
      dataType: 'html',
    }).success(function(data){
      $(this).parent().html(data)
    }.bind(this))
  })

  // bỏ like
  $(document).on('click', ".destroy-like-button", function(e){
    e.preventDefault();
    var post_id = $(this).attr('post-id');
    var like_id = $(this).data('id');
    $.ajax({
      url: window.location.origin + "/posts/" + post_id + "/likes/" + like_id,
      method: "DELETE",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).closest(".like").html(data)
    }.bind(this))
  })

  // xóa ảnh
  $(document).on('click', ".destroy-picture-button", function(e){
    e.preventDefault();
    var id_picture = $(this).next("input").val();
    $.ajax({
      url: window.location.origin +"/"+"posts/"+ $(this).attr("post-id")+"/pictures/"+ id_picture,
      method: "DELETE",
      dataType: 'html',
      processData: true,
    })
  })

  // friend request
  $(document).on('submit', '.new_friendship', function(e){
    e.preventDefault();
    debugger
    method = $(this).attr('method')
    action = $(this).attr('action')
    user_response = $(this).find("input#friendship_user_response").val();
    $.ajax({
      url: window.location.origin +"/"+action,
      method: method,
      data: {friendship: {user_response: user_response}},
      dataType: 'html',
    }).success(function(data){
      $(this).parent().html(data);
    }.bind(this));
  })

// destroy friendship for user send request
  $(document).on('click', '.glyphicon-remove-circle', function(e){
    e.preventDefault();
    friendship_id = $(this).parent().attr('friendship-id');
    $.ajax({
      url: window.location.origin +"/friendships/" + friendship_id,
      method: "DELETE",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).closest('.destroy-friend').html(data);
    }.bind(this))
  })

// destroy request for use recived request
  $(document).on('click', '.del-request-for-user', function(e){
    e.preventDefault();
    debugger
    friendship_id = $(this).parent().attr('friendship-id');
    $.ajax({
      url: window.location.origin +"/friendships/" + friendship_id,
      method: "DELETE",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).closest('li').remove()
    }.bind(this))
  })

// update friendship
  $(document).on('click', '.glyphicon-ok-circle', function(e){
    e.preventDefault();
    friendship_id = $(this).parent().attr('friendship-id');
    $.ajax({
      url: window.location.origin +"/friendships/" + friendship_id,
      method: "PUT",
      data: {friendship: {status: "accept"}},
      dataType: 'json'
    }).success(function(data){
      
    }.bind(this))
  })

  // show post 
  $(document).on('click', '.more-content a', function(e){
    e.preventDefault();
    post_id = $(this).parent().data('id')
    $.ajax({
      url: window.location.origin +"/posts/" + post_id,
      method: 'get',
      dataType: 'html'
    }).success(function(data){
      $('.hide-post').html(data);
      $('body').css({'overflow':'hidden'})
      $('.hide-post').show()
      $('.container').css({'opacity':'0.1'})
    }.bind(this))
  })

  // show form share
  $(document).on('click', '.glyphicon-share-alt', function(e){
    e.preventDefault();
    var url = $(this).find('a').attr('href')
    $.ajax({
      url: url,
      method: 'get',
      dataType: 'html',
    }).success(function(data){
      $('.hide-share').html(data)
      $('.hide-share').show()
      $('.container').css({'opacity':'0.1'})
      $('body').css({'overflow':'hidden'})
    })
  })

  // share
  $(document).on('submit', '.new_share', function(e){
    debugger
    e.preventDefault();
    action = $(this).attr('action')
    method = $(this).attr('method')
    content = $(this).find(`input[name='share[content]']`).val()
    $.ajax({
      url: action,
      method: method,
      data: {share: {content: content}}
    })
  })

  // destroy share
  $(document).on('click', '.destroy-share', function(e){
    e.preventDefault()
    share_id = $(this).data('id')
    post_id = $(this).attr('post-id')
    $.ajax({
      url: window.location.origin + '/posts/' + post_id + '/shares/' + share_id,
      method: "DELETE",
      dataType: 'html',
    }).success(function(data){
      $(this).closest('.option-area').next('.avatar-area').css({'display':'none'})
    }.bind(this))
  })
});

// edit share
  $(document).on('click', '.edit-share', function(e){
    debugger
    e.preventDefault()
    share_id = $(this).data('id')
    post_id = $(this).attr('post-id')
    $.ajax({
      url: window.location.origin + '/posts/' + post_id + '/shares/' + share_id + '/edit',
      method: 'get',
      dataType: 'html'
    }).success(function(data){
      $(this).closest('.option-area').next('.avatar-area').find('.content-react').html(data)
    }.bind(this))
  })

// update share
  $(document).on('submit', '.edit_share', function(e){
    e.preventDefault()
    content = $(this).find('input.edit_post').val()
    action = $(this).attr('action')
    $.ajax({
      url: action,
      method: 'put',
      data: {share: {content: content}},
      dataType: 'json',
    }).success(function(data){
      $(this).html("<span>"+data.content+"</span>")
    }.bind(this))
  })

// infinity scroll
var i = 1;
$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
    i++;
    load_more_post = '/?page=' + i;
    $.ajax({
      method: "GET",
      url: load_more_post,
      dataType: 'html',
    }).success(function(data){
      $('.posts').append(data)
    })
  }
});
