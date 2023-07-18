class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :genre, :bpm, :key

  belongs_to :setlist
end
