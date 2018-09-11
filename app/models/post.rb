class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, -> {order(created_at: :desc)}, dependent: :destroy
  has_many :pictures, dependent: :destroy
  validates :content, presence: true
  accepts_nested_attributes_for :pictures, allow_destroy: true
  default_scope -> { order(created_at: :desc) }
  def time_in_words
    # TODO Parse time to year/month/week/date/hour
    # distance_minute = ((Time.now.getutc - created_at) / 60).round
    "less than a minute"
  end
end
