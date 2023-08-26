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
        setlist = Setlist.create!(setlist_params[:set])
        tracks = setlist.tracks.create!(tracks_params[:tracks])
        render json: setlist, status: :created
    end

    private

    def setlist_params
        params.permit(:set => [:name, :user_id, :description, :length, :genre, :avg_bpm])
    end

    def tracks_params
        params.permit(:tracks => [:name, :genre, :length, :bpm, :key, :artist])
    end
end
