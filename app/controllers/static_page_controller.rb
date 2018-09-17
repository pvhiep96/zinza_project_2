class StaticPageController < ApplicationController
  before_action :set_post, only: [:home, :wall]
  before_action :find_friend, only: [:home, :wall]
  before_action :find_user, only: [:wall]
  def home
    @posts = current_user.posts.limit(10)
    @post = Post.new(user: current_user)
    @post.pictures.build
    @comments = @post.comments
    @friend_ship = Friendship.new()
  end

  def wall
    @posts = @user.posts.limit(10)
    @friend_ship = Friendship.new()
  end
  
  private
  
  def find_user 
    @user = User.find_by(id: params[:id])
  end

  def find_friend
    @friend = current_user.user_requests.find_by(user_request: current_user.id)
    @response = current_user.user_responses.find_by(user_response: current_user.id)
  end

  def set_post
    @post_item = Post.find_by(id: params[:id])
  end
end
