class SetlistSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre, :avg_bpm, :user_id, :date

  def date
    object.created_at.to_date
  end
end
