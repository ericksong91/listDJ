class SetlistSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :genre

  # def setlist_by_date
  #   object.order(created_at: :desc).limit(5)
  # end
end
