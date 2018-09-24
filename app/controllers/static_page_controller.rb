# frozen_string_literal: true

class StaticPageController < ApplicationController
  before_action :set_post, only: %i[home wall]
  before_action :authenticate_user!
  before_action :find_friendship, only: %i[home wall]
  before_action :find_user, only: %i[wall home]
  def home
    @search_user = User.ransack(params[:q]).result
    friend_ids = User.get_friend_ids(current_user.id)
    @posts = Post.where('user_id IN (?)', friend_ids).page(params[:page]).per(30)
    @shares = Share.where('user_id IN (?)', friend_ids)
    @feed = ((@posts + @shares).sort_by { |smt| - smt.created_at.to_i })
    @post = Post.new(user: current_user)
    @post.pictures.build
    @comments = @post.comments
    @friend_ship = Friendship.new
    render_load_post && return if request.xhr?
  end

  def wall
    @posts = @user.posts.limit(10)
    @friend_ship = Friendship.new
  end

  def show_search
    @search = User.ransack(params[:q])
    @people = @search.result.page(params[:page]).per(9)
  end
  private

  def find_user
    @user = User.find_by(id: params[:id])
    return 'shared/_404' if @user.nil?
  end

  def find_friendship
    @current_friendship = Friendship.by_requester_and_responser(current_user.id, params[:id])
  end

  def set_post
    @post_item = Post.find_by(id: params[:id])
    return 'shared/_404' if @post_item.nil?
  end

  def render_load_post
    render 'load_post', layout: false
  end
end
