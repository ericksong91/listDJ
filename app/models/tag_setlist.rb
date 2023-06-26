class TagSetlist < ApplicationRecord
    validates :tag_id, presence: true
    validates :setlist_id, presence: true

    belongs_to :tag
    belongs_to :setlist
end
