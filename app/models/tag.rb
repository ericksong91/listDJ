class Tag < ApplicationRecord

    has_many :tag_setlists
    has_many :setlists, through: :tag_setlists
end
