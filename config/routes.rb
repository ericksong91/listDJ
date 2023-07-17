Rails.application.routes.draw do
    get '/setlists', to: 'setlists#index'




    ## 
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }
end
