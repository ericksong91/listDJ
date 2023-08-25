class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :genre, :bpm, :key, :length, :artist
end
