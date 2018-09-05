class StaticPageController < ApplicationController
  def home
    @post = current_user.posts.build
  end
end
