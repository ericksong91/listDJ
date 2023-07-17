class SetlistsController < ApplicationController
    def index
        setlists = Setlist.all
        render json: setlists
    end

    def show
    end
end
