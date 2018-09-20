class PostsController < ApplicationController
  before_action :user_signed_in?, only: [:destroy, :create]
  before_action :set_post, only: [:destroy, :show, :edit, :update]
  before_action :find_user, only: [:show]
  def index
    @post = Post.all
  end
  
  def show
    render 'show', layout: false, locals: {post: @post} 
  end

  def edit
    respond_to do |format|
      format.js
      format.html do
        render 'edit', layout: false, locals: {post: @post} 
      end
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    @post.save
    respond_to do |format|
      format.js
      format.html do
        render '_post', layout: false, locals: {post: @post} 
      end
    end
  end

  def update
    @post.update_attributes(post_params)
    respond_to do |f|
      f.js
      f.html do
        render 'post_form', layout: false, locals: {post: @post} 
      end
      # f.json { render json: @post.to_json(only: [:content])}
      # format.json { render json: @comment.to_json(only: [:content], include: [user: {only:[:name]}])}
    end
  end

  def destroy
    @post.destroy
    render json: @post.to_json
  end

  def post_show
    render 'post_show', layout: false, locals: {post: @post} 
  end

  private

  def set_post
    @post = Post.find_by(id: params[:id])
    return 'shared/_404' if @post.nil?
  end
  
  def post_params
    params.require(:post).permit(:content, pictures_attributes: %i[id picture_url _destroy])
  end
  
  def find_user
    @user = User.find_by(id: params[:id])
    return 'shared/_404' if @user.nil?
  end
  
end
