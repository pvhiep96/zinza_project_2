class PostsController < ApplicationController
  before_action :user_signed_in?, only: [:destroy, :create]
  before_action :set_post, only: [:destroy]
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
    
    binding.pry
    
    @post = current_user.posts.build(post_params)
    # @post.content = params[:post][:content]
    @post.save
    respond_to do |format|
      format.js
      format.json { render json: @post.to_json(only: [:content], methods: [:time_in_words])}

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
