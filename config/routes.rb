Rails.application.routes.draw do
  root to: 'static_page#home'
  devise_for :users
  resources :posts do
    resources :comments
  end
  resources :posts, only: [:create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end