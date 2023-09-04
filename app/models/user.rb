class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    attr_accessor :skip_validations

    validates :username, presence: true, unless: :skip_validations
    validates :username, uniqueness: true, unless: :skip_validations
    validates :username, uniqueness: { case_sensitive: false }, unless: :skip_validations
    validates :password_digest, presence: true, unless: :skip_validations
    validates :password, presence: true, unless: Proc.new { |user| user.password.blank? }
    validates :password_confirmation, presence: true, unless: Proc.new { |user| user.password.blank? }
    validates :bio, presence: true, unless: :skip_validations
    validates :avatar,
        content_type: [:gif, :png, :jpg, :jpeg],
        size: { less_than: 1.megabytes , message: 'is too large - You cannot upload an image file greater than 1MB' }

    has_many :setlists, dependent: :destroy
end
