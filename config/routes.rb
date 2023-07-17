Rails.application.routes.draw do
    resources :setlists, only: [:index, :show]
    resources :users, only: [:index]
    resources :tracks, only: [:index]

    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
