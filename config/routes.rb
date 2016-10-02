Rails.application.routes.draw do
  get '/' => 'home#index'
  get '/play' => 'home#index'

  namespace :api do
    resources :boards, only: [:index] do
      get '/verify_word/:word' => 'boards#verify_word'
    end
  end
end
