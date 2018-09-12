class StaticPageController < ApplicationController
  before_action :set_post, only: [:home]
  def home
    @posts = current_user.posts.limit(10)
    @post = Post.new(user: current_user)
    @post.pictures.build
    @comments = @post.comments
  end


  private

  def set_post
    @post_item = Post.find_by(id: params[:id])
  end
end
