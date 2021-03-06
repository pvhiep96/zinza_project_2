# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_post, only: %i[create edit update]
  before_action :find_comment, only: %i[destroy edit update]
  def new; end

  def show; end

  def create
    @comment = @post.comments.create(comment_params)
    @comment.user_id = current_user.id
    @comment.save
    # user_name = @comment.user.name
    respond_to do |format|
      format.js
      # format.json { render json: @comment.to_json(only: [:content], include: [user: {only:[:name]}])}
      format.html do
        render '_comment', layout: false, locals: { comment: @comment, post: @post }
      end
    end
  end

  def edit
    respond_to do |format|
      format.js
      format.html do
        render 'edit', layout: false, locals: { comment: @comment, post: @post }
      end
    end
  end

  def update
    @comment.update_attributes comment_params
    respond_to do |format|
      format.js
      format.json { render json: @comment.to_json(only: [:content]) }
    end
  end

  def destroy
    @comment.destroy
    render json: @comment.to_json, include: [post: { only: [:id] }]
  end

  private

  def find_post
    @post = Post.find(params[:post_id])
    return 'shared/_404' if @post.nil?
  end

  def find_comment
    @comment = Comment.find_by(id: params[:id])
    return 'shared/_404' if @comment.nil?
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
