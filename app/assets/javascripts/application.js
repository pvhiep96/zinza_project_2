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
$(document).ready(function(){
  $("#new_post").submit(function(event){
    event.preventDefault();
    action = $(this).attr('action');
    method = $(this).attr('method');
    content = $(this).find('textarea').val();
    $.ajax({
      type: method,
      url: action,
      data: { post: {content: content}},
      dataType: 'json',
      success: function(data){
        $(':input[type="submit"]').prop('disabled', false);
        var result = "<li>" + "<span class=\"content\">" + data.content + "</span>"+"<span class=\"timestamp\">"+ data.time_in_words + " "+"ago."+"</span>"+ "</li> "
        $('.posts').prepend(result);
        $('#post_content').val('');
      }
    });
  });
  $(".destroy-post").click(function(event){
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url: "/posts/" + id,
      method: "DELETE",
      processData: true,
    }).success(function() {
      $(this).closest("li").remove();
    }.bind(this))
  })
});