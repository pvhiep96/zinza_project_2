Rails.application.routes.draw do
  get 'shares/create'
  root to: 'static_page#home'
  devise_for :users
  get 'static_page/wall/:id' => 'static_page#wall', as: :wall
  resources :friendships
  resources :posts do
    resources :comments
    resources :likes
    resources :pictures
    resources :shares
  end
  resources :posts, only: [:create, :destroy, :show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
