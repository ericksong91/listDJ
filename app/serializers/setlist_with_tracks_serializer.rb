class SetlistWithTracksSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre

  has_many :tracks
end
