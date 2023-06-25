class Tag < ApplicationRecord

    has_many :tags_setlist
    has_many :setlists, through: :tags_setlist
end
