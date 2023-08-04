class SetlistSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre, :avg_bpm, :user_id
end
