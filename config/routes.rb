Rails.application.routes.draw do
    resources :setlists, only: [:index, :show]
    resources :users, only: [:index, :create]
    resources :tracks, only: [:index]

    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
