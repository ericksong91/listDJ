class User < ApplicationRecord
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, uniqueness: { case_sensitive: false }
    validates :password_digest, presence: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :bio, presence: true
    has_secure_password
    has_one_attached :image

    # add validation for preventing users to do only numbers

    has_many :setlists
end
