class FriendshipsController < ApplicationController
  before_action :find_user, only: [:create]
  before_action :find_friendship, only: [:destroy, :update]

  def create
    @friend = current_user.user_requests.build(friend_params)
    @friend.save
    respond_to do |format|
      format.js
      format.html do
        render 'destroy', layout: false, locals: {friendship: @friend}
      end
    end
  end

  def update
    @friendship.update_attributes(friend_params)
    respond_to do |format|
      format.js
      format.json { render json: @friendship.to_json(only: [:status]) }
    end
  end

  def destroy
    @friendship.destroy
    respond_to do |format|
      format.js
      format.html do
        render 'create', layout: false, locals: {friendship: @friendship, user: @friendship.responser} 
      end
    end
  end

  private
  
  def find_friendship
    @friendship = Friendship.find_by(id: params[:id])
  end

  def friend_params
    params.require(:friendship).permit(:user_response, :user_request, :status)
  end

  def find_user
    @user = User.find_by(id: params[:id])
  end

end
