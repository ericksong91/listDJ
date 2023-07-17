Rails.application.routes.draw do
    resources :setlists, only: [:index, :show]




    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
