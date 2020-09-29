# frozen_string_literal: true

class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    # p "#{decoded_auth_token} _______________"
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token

    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    p "#{http_auth_header} !!!!!!!!!!!"
    p "#{JsonWebToken.decode(http_auth_header)} &&&&&&&&&&&&&&&&&&&&&&&&&&"
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    auth_header ? (return auth_header) : errors.add(:token, 'Missing token')

    nil
  end

  def auth_header
    p headers['Authorization']
    headers['Authorization']
  end
end
