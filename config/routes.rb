Rails.application.routes.draw do
    resources :setlists, only: [:index, :show, :create, :destroy]
    resources :users, only: [:index, :destroy, :update]
    resources :tracks, only: [:index, :show]

    #User Routing, signups, profile, login, logout
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    #Batch Update Setlist_tracks
    patch "/setlist_tracks", to: "setlist_tracks#update"

    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
