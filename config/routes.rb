Rails.application.routes.draw do
  get '/' => 'home#index'
  
  namespace :api do
    resources :boards, only: [:show] do
      get '/verify_word/:word' => 'boards#verify_word'
    end
  end
end
