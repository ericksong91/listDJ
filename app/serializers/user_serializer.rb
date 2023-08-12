class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
