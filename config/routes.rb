Rails.application.routes.draw do
    resources :setlists, only: [:index, :show]
    resources :users, only: [:index, :destroy]
    resources :tracks, only: [:index]

    #User Routing, signups, profile, login, logout
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
