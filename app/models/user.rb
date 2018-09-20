class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :shares, dependent: :destroy
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

  scope :get_friend_ids, -> (user_id){
    Friendship.where('user_request = ? or user_response = ? AND status = 1' , user_id, user_id)
      .pluck(:user_request, :user_response).flatten.uniq
  }
  scope :get_post_shared_ids, -> (post_id){
    Share.where('post_id = ?', post_id).pluck(:post_id)
  }
end
