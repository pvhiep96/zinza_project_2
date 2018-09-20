class SharesController < ApplicationController
  before_action :user_signed_in? , only: [:destroy, :create, :edit]
  before_action :find_post, only: [:new, :create, :edit]
  before_action :find_share, only: [:new, :update, :destroy, :edit]
  
  def new
    render 'new', layout: false, locals: {share: @share}
  end
  
  def create
    @share = @post.shares.build(share_params)
    @share.user_id = current_user.id
    @share.save
  end

  def edit
    respond_to do |format|
      format.js
      format.html do
        render 'edit', layout: false, locals: {share: @share, post: @post} 
      end
    end
  end

  def update
    @share.update_attributes(share_params)
    respond_to do |format|
      format.js
      format.json { render json: @share.to_json(only: [:content]) }
    end
      # f.json { render json: @post.to_json(only: [:content])}
      # format.json { render json: @comment.to_json(only: [:content], include: [user: {only:[:name]}])}
  end

  def destroy
    @share.destroy
    render json: @share.to_json
    return 'shared/_404' if @share.nil?
  end
  private

  def share_params
    params.require(:share).permit(:user_id, :content)
  end

  def find_share
    @share = Share.find_by(id: params[:id])
    return 'shared/_404' if @share.nil?
  end

  def find_post
    @post = Post.find_by(id: params[:post_id])
    return 'shared/_404' if @post.nil?
  end
end
