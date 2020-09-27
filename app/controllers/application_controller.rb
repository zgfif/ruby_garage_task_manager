# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :authenticate_request
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  attr_reader :current_user

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def handle_record_not_found
    render json: {}, status: :accepted
  end
end
