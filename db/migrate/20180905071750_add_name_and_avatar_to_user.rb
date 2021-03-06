# frozen_string_literal: true

class AddNameAndAvatarToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :name, :string
    add_column :users, :avatar, :string
  end
end
