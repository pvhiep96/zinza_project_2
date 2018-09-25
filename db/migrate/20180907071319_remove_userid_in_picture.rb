# frozen_string_literal: true

class RemoveUseridInPicture < ActiveRecord::Migration[5.2]
  def change
    remove_column :pictures, :user_id
  end
end
