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

$(document).on('click', ".option", function() {
  $(this).next().show()
});

$(".option-menu").click(function(event){
  event.stopPropagation();
  $(".option-menu").hide();
})

$(document).ready(function(){  
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
  
  $("#new_post").submit(async function(event){
    event.preventDefault();
    var file = $("#file_button").prop('files')[0];
    var base64_data = "";
    if(file != " "){
      var promise = getBase64(file);
      var base64_data = await promise;
    };
    action = $(this).attr('action');
    method = $(this).attr('method');
    content = $(this).find('textarea').val();
    params_picture =  {"0":{"picture_url": base64_data}};
    $.ajax({
      // async: false,
      type: method,
      url: action,
      data: { post: {content: content, pictures_attributes: params_picture}},
      dataType: 'html',
      success: function(data){
        $(':input.post_form').prop('disabled', false);
        $('.posts').prepend(data);
        $('#post_content').val('');
      },
    });
  });

  $(document).on('click', '.destroy-post', function(event){
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url: "/posts/" + id,
      method: "DELETE",
      processData: true,
    }).success(function() {
      ($(this).closest(".option-area")).next(".content_item").remove();
    }.bind(this))
  });

  $(document).on('submit', ".new_comment", function(e){
    e.preventDefault();
    action = $(this).attr('action');
    method = $(this).attr('method');
    content = $(this).find('input.comment_textbox').val();
    $.ajax({
      type: method,
      url: action,
      data: { comment: {content: content}},
      dataType: 'html',
    }).success(function(data){
      $(':input[type="submit"]').prop('disabled', false);
      $(this).prev(".comment-area").prepend(data);     
      ($(this).children("input")).val('');
    }.bind(this));
  });

  $(document).on('click', '.destroy-comment', function(event){
    event.preventDefault();
    var post_id = $(this).attr('post-id');
    var id = $(this).data("id");
    $.ajax({
      url: "posts/" + post_id + "/comments/" + id,
      method: "DELETE",
      processData: true,
    }).success(function() {
      ($(this).closest(".comment_detail")).remove();
    }.bind(this))
  });

  $(document).on('click', '.edit-post', function(event){
    event.preventDefault();
    // $(".post-area").hide();
    var post_id = $(this).data("id");
    $.ajax({
      url: "posts/" + post_id + "/edit",
      method: "GET",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).closest(".option-area").next(".content_item").find(".content").html(data)
    }.bind(this))
  });

  $(document).on('submit','.edit_post', function(e){
    e.preventDefault();  
    var action = $(this).attr("action");
    var method = $(this).attr("method");
    var update_content = $(this).find("input#post_content").val();
    $.ajax({
      url: action,
      method: "PUT",
      data: { post: {content: update_content}},
      dataType: 'json',
    }).success(function(data){
      $(this).html(data.content);
    }.bind(this))
  })

  $(document).on('click', '.edit-comment', function(e){
    event.preventDefault();
    var comment_id = $(this).data("id"); 
    var post_id = $(this).attr("post-id");
    $.ajax({
      url: "posts/" + post_id + "/comments/" + comment_id  + "/edit",
      method: "GET",
      dataType: 'html',
      processData: true,
    }).success(function(data){
      $(this).parent().prev().find("span").html(data)
    }.bind(this))
  })

  $(document).on('submit','.edit_comment', function(e){
    e.preventDefault();
    var action = $(this).attr('action');
    var method = $(this).attr('method');
    var update_comment = $(this).find("input#comment_content").val();
    $.ajax({
      url: action,
      method: "PUT",
      data: {comment: {content: update_comment}},
      dataType: 'json',
    }).success(function(data){
      $(this).html("<span>"+data.content+"</span>");
    }.bind(this))
  })
});
