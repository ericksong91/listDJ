class SetlistsController < ApplicationController
    def index
        setlists = Setlist.order(created_at: :desc)
        render json: setlists, each_serializer: SetlistWithTracksSerializer
    end

    def show
        setlist = Setlist.find(params[:id])
        render json: setlist, serializer: SetlistWithTracksSerializer
    end

    def update
        if check_session
            user = current_user
            setlist = find_setlist

            if user.id == setlist.user_id
                setlist.update!(setlist_info_params)
                render json: setlist, serializer: SetlistWithTracksSerializer
            else
                render_not_authorized_response
            end
        else
            render_not_authorized_response
        end
    end

    def create
        if check_session
            ActiveRecord::Base.transaction do
                @setlist = Setlist.create!(setlist_params[:set])
                tracks = setlist_params[:tracks]
                tracks.each{|t| where_duplicate(t).first_or_create(t)}
        
                i = 1

                tracks.each do |t| 
                    @setlist.setlist_tracks.create!(track_id: check_duplicate(t).id, track_order: i)
                    i+=1
                end

                @setlist.update!(avg_bpm: @setlist.tracks.average(:bpm), length: @setlist.setlist_tracks.map {|t| t.track}.sum(&:length)/60)
            end
            
            render json: @setlist, serializer: SetlistWithTracksSerializer, status: :created
        else
            render_not_authorized_response
        end

    end

    def destroy
        if check_session
            user = current_user
            setlist = find_setlist

            if setlist.user_id.to_i == user.id
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

    def check_duplicate(t)
        Track.find_by(name: t[:name], artist: t[:artist], genre: t[:genre], bpm: t[:bpm], length: t[:length])
    end

    def where_duplicate(t)
        Track.where(name: t[:name], artist: t[:artist], genre: t[:genre], bpm: t[:bpm], length: t[:length])
    end

    def setlist_params
        params.permit(:set => [:name, :user_id, :description, :length, :genre, :avg_bpm], :tracks => [:name, :genre, :length, :bpm, :artist])
    end

    def setlist_info_params
        params.permit(:name, :description)
    end

    def find_setlist
        Setlist.find(params[:id])
    end
end
