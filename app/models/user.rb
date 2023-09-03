class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, uniqueness: { case_sensitive: false }
    validates :password_digest, presence: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :bio, presence: true
    validates :avatar,
        content_type: [:gif, :png, :jpg, :jpeg],
        size: { less_than: 1.megabytes , message: 'is too large - You cannot upload an image file greater than 1MB' }

    has_many :setlists, dependent: :destroy
end
