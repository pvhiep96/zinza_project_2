# frozen_string_literal: true

class Friendship < ApplicationRecord
  belongs_to :requester, class_name: 'User', foreign_key: 'user_request'
  belongs_to :responser, class_name: 'User', foreign_key: 'user_response'
  enum status: { notfriend: 0, accept: 1 }
  # validates :user_request, :uniqueness => {:scope => :user_response}
  validate :friendship_uniqueness

  scope :by_requester_and_responser, lambda { |user_id, friend_id|
    where('user_request = ? or user_response = ? AND user_request =
      ? or user_response = ?', user_id, user_id, friend_id, friend_id).first
  }

  private

  def friendship_uniqueness
    existing_record = Friendship.by_requester_and_responser(user_request, user_response)
    errors.add(:user_id, 'has already been saved for this relationship') if existing_record
  end
end
