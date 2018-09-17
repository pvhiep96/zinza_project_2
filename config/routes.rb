Rails.application.routes.draw do
  root to: 'static_page#home'
  devise_for :users
  get 'static_page/wall/:id' => 'static_page#wall', as: :wall
  resources :friendships
  resources :posts do
    resources :comments
    resources :likes
    resources :pictures
  end
  resources :posts, only: [:create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
