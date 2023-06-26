class Track < ApplicationRecord
    validates :name, presence: true
    validates :length, presence: true
    validates :genre, presence: true

    has_many :setlist_tracks
    has_many :setlists, through: :setlist_tracks
end
