class PostsController < ApplicationController
  before_action :user_signed_in?, only: [:destroy, :create]
  before_action :set_post, only: [:destroy, :show]
  def index
    @post = Post.all
  end
  
  def show
    @user = current_user
    @posts = @user.posts.all
  end

  def edit
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
  end

  def destroy
    @post.destroy
    render json: @post.to_json
  end

  private

  def set_post
    @post = Post.find_by(id: params[:id])
  end
  
  def post_params
    params.require(:post).permit(:content, pictures_attributes: %i[id picture_url _destroy])
  end
end
