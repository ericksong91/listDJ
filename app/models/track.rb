class Track < ApplicationRecord

    has_many :setlist_tracks
    has_many :setlists, through: :setlist_tracks
end
