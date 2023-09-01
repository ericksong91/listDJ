class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :genre, :bpm, :length, :artist
end
