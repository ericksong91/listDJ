class Track < ApplicationRecord
    validates :name, presence: true
    validates :artist, presence: true
    validates :length, presence: true
    validates :genre, presence: true
    validates :bpm, presence: true
    validates :key, presence: true
    validates :length, numericality: true

    has_many :setlist_tracks
    has_many :setlists, through: :setlist_tracks
end
