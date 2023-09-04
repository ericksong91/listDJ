class SetlistTracksController < ApplicationController
    def update
        if check_session
            user = find_user
            setlist = find_setlist

            if setlist.user_id === user.id
                ActiveRecord::Base.transaction do
                    grouped_tracks = tracklist_params[:_json].index_by{ |tr| tr[:id]}
                    @updated = SetlistTrack.update(grouped_tracks.keys, grouped_tracks.values)
                    ids = @updated.map{|i| i['id'].to_i}
                    setlist_delete = setlist.setlist_tracks.where.not(id: ids).destroy_all
                end

                render json: @updated, status: :accepted
            else
                render_not_authorized_response
            end
        else
            render_not_authorized_response
        end
    end

    private

    def find_user
        User.find(session[:user_id])
    end

    def find_setlist
        Setlist.find(params[:_json][0][:setlist_id])
    end

    def tracklist_params
        params.permit(:_json => [:id, :setlist_id, :track_id, :track_order])
    end


end
