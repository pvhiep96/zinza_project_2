# frozen_string_literal: true

class AddStatusToFriendship < ActiveRecord::Migration[5.2]
  def change
    add_column :friendships, :status, :integer, default: 0
    # Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
