class LikesController < ApplicationController
  before_action :find_react, only: [:edit, :update, :destroy]
  before_action :find_post, only: [:create, :destroy]
  def edit
  end

  def create    
    @react = @post.likes.build(react_params)
    @react.user_id = current_user.id
    @react.save
    respond_to do |format|
      format.js
      format.html do
        render 'unlike', layout: false, locals: {like: @react, post: @post}
      end
    end

    # respond_to do |format|
    #   format.js
    #   # format.json { render json: @comment.to_json(only: [:content], include: [user: {only:[:name]}])}
    #   format.html do
    #     render '_comment', layout: false, locals: {comment: @comment, post: @post} 
    #   end
    # end
  end

  def update
  end

  def destroy
    @react.destroy
    # render json: @react.to_json, include: [post: {only:[:id]}]
    respond_to do |format|
      format.js
      format.html do
        render 'like', layout: false, locals: {like: @react, post: @post}
      end
    end
  end

  private 

  def find_post
    @post = Post.find(params[:post_id])
    return 'shared/_404' if @post.nil?
  end

  def find_react
    @react = Like.find_by(id: params[:id])
  end

  def react_params
    params.require(:like).permit(:status)
  end
end
