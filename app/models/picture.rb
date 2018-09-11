class Picture < ApplicationRecord
  belongs_to :post
  mount_base64_uploader :picture_url, PictureUploader
end
