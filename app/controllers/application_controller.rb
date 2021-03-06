# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :search_user
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:avatar])
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:username, :email, :password,
               :password_confirmation, :current_password, :avatar, :avatar_cache, :remove_avatar)
    end
  end

  private

  def search_user
    @q = User.ransack(params[:q])
    @people = @q.result(distinct: true)
  end
end
