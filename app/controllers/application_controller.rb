# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def present_user
    User.first
  end

  def handle_record_not_found
    render json: {}, status: :accepted
  end
end
