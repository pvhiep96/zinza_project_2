# frozen_string_literal: true

class Share < ApplicationRecord
  belongs_to :user
  belongs_to :post
  default_scope -> { order(created_at: :desc) }
end
