class Setlist < ApplicationRecord

    belongs_to :user
    has_many :setlist_tracks
    has_many :tracks, through: :setlist_tracks

    has_many :tags_setlist 
    has_many :tags, through: :tags_setlist
end
