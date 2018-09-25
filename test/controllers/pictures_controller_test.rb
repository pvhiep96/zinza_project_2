# frozen_string_literal: true

require 'test_helper'

class PicturesControllerTest < ActionDispatch::IntegrationTest
  test 'should get update' do
    get pictures_update_url
    assert_response :success
  end
end
