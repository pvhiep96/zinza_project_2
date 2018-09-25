# frozen_string_literal: true

class PicturesController < ApplicationController
  before_action :find_picture, only: [:destroy]
  def update; end

  def destroy
    @picture.destroy
    # render json: @react.to_json, include: [post: {only:[:id]}]
    # respond_to do |format|
    #   format.js
    #   format.html do
    #     render 'like', layout: false, locals: {like: @react, post: @post}
    #   end
    # end
  end

  private

  def find_picture
    @picture = Picture.find_by(id: params[:id])
  end
end
