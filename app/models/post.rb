class Post < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :content, presence: true
  default_scope -> { order(created_at: :desc) }

  def time_in_words
    # TODO Parse time to year/month/week/date/hour
    # distance_minute = ((Time.now.getutc - created_at) / 60).round
    "less than a minute"
  end
end
