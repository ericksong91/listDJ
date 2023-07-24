class TracksController < ApplicationController
    def index
        tracks = Track.all
        render json: tracks
    end

    def show
        if find_track
            render json: find_track
        end
    end

    private 

    def find_track
        Track.find_by(id: params[:id])
    end
end
