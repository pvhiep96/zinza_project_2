class StaticPageController < ApplicationController
  before_action :set_post, only: [:home, :wall]
  before_action :find_friendship, only: [:home, :wall]
  before_action :find_user, only: [:wall, :home]
  def home
    friend_ids = User.get_friend_ids(current_user.id)
    # @posts = current_user.posts.limit(10)
    @posts = Post.where('user_id IN (?)', friend_ids).limit(50)
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

  def find_friendship
    @current_friendship = Friendship.by_requester_and_responser(current_user.id, params[:id])
  end

  def set_post
    @post_item = Post.find_by(id: params[:id])
  end
end
