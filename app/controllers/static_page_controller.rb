class StaticPageController < ApplicationController
  def home
    @posts = current_user.posts
    @post = Post.new(user: current_user)
    @post.pictures.build
  end
end
