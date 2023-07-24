class SetlistWithTracksSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre

  has_many :tracks
  has_many :setlist_tracks
end
