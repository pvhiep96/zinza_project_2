class AddContentInShare < ActiveRecord::Migration[5.2]
  def change
    add_column :shares, :content, :string
  end
end
