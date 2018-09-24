# frozen_string_literal: true

class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.integer :user_request
      t.integer :user_response

      t.timestamps
    end
    add_index :friendships, %i[user_request user_response], unique: true
  end
end
