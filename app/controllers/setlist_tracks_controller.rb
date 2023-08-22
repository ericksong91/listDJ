class SetlistTracksController < ApplicationController
    def update
        params.permit!
        grouped_tracks = params[:_json].index_by{ |tr| tr[:id]}
        updated = SetlistTrack.update(grouped_tracks.keys, grouped_tracks.values)
        render json: updated, status: :accepted
    end
end
