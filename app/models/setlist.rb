class Setlist < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :user
    has_many :setlist_tracks
    has_many :tracks, through: :setlist_tracks

    has_many :tag_setlists 
    has_many :tags, through: :tag_setlists
end
