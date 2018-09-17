class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy  
  has_many :user_requests, dependent: :destroy, foreign_key: "user_request", class_name: "Friendship"
  has_many :user_responses, dependent: :destroy, foreign_key: "user_response", class_name: "Friendship"
  has_many :follows, dependent: :destroy
  
  mount_uploader :avatar, AvatarUploader

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true
  validates :password, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
