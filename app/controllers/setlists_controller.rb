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
        if check_session
            setlist = Setlist.create!(setlist_params[:set])
            tracks = setlist.tracks.create!(setlist_params[:tracks])
    
            i = 1
    
            setlist.setlist_tracks.each do |t|
                t.update!(track_order: i)
                i+=1
            end
    
            setlist.update!(avg_bpm: setlist.tracks.average(:bpm), length: setlist.tracks.sum(&:length)/60)
            render json: setlist, serializer: SetlistWithTracksSerializer, status: :created
        else
            render_not_authorized_response
        end

    end

    def destroy
        if check_session
            user = current_user
            setlist = find_setlist

            if setlist.user_id === user.id
                setlist.destroy
                head :no_content
            else
                render_not_authorized_response
            end
        else
            render_not_authorized_response
        end
    end

    private

    def setlist_params
        params.permit(:set => [:name, :user_id, :description, :length, :genre, :avg_bpm], :tracks => [:name, :genre, :length, :bpm, :key, :artist])
    end

    def find_setlist
        Setlist.find(params[:id])
    end
end
