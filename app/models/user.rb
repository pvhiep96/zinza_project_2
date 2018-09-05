class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy  
  has_many :friendships, dependent: :destroy
  has_many :follows
  
  mount_uploader :avatar, AvatarUploader

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true
  validates :password, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
