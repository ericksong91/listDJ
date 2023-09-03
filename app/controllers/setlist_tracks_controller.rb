class SetlistTracksController < ApplicationController
    def update
        if check_session
            grouped_tracks = tracklist_params[:_json].index_by{ |tr| tr[:id]}
            updated = SetlistTrack.update(grouped_tracks.keys, grouped_tracks.values)
            ids = updated.map{|i| i['id'].to_i}
            setlist_delete = updated.first.setlist.setlist_tracks.where.not(id: ids).destroy_all
    
            render json: updated, status: :accepted
        else
            render_not_authorized_response
        end
    end

    private

    def tracklist_params
        params.permit(:_json => [:id, :setlist_id, :track_id, :track_order])
    end


end
