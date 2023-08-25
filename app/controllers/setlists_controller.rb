class SetlistsController < ApplicationController
    def index
        setlists = Setlist.order(created_at: :desc)
        render json: setlists, each_serializer: SetlistWithTracksSerializer
    end

    def show
        setlist = Setlist.find(params[:id])
        render json: setlist, serializer: SetlistWithTracksSerializer
    end

    def create
        byebug 
    end
end
