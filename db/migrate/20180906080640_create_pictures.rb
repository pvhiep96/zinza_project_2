class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :picture_url
      t.references :user
      t.references :post

      t.timestamps
    end
  end
end
