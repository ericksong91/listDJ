class SetlistTrack < ApplicationRecord
    validates :track_id, presence: true
    validates :setlist_id, presence: true
    
    belongs_to :setlist
    belongs_to :track
end
