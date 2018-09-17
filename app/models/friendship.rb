class Friendship < ApplicationRecord
  belongs_to :requester, class_name: 'User', foreign_key: 'user_request'
  belongs_to :responser, class_name: 'User', foreign_key: 'user_response'
  enum status: {notfriend: 0, accept: 1}
end
