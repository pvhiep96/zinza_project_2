class PostsController < ApplicationController
  before_action :user_signed_in?, only: [:destroy, :create]
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
    if @post.save
      flash[:success] = "post create"
      redirect_to root_url
    else
      render 'static_page/home'
    end
  end

  def update
  end

  def destroy
  end

  private
  
  def post_params
    params.require(:post).permit(:content)
  end
end
