class SetlistTracksController < ApplicationController
    def update
        grouped_tracks = tracklist_params[:_json].index_by{ |tr| tr[:id]}
        updated = SetlistTrack.update(grouped_tracks.keys, grouped_tracks.values)
        render json: updated, status: :accepted
    end


    private

    def tracklist_params
        params.permit(:_json => [:id, :setlist_id, :track_id, :track_order])
    end


end
