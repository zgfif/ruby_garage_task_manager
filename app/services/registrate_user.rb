# frozen_string_literal: true

class RegistrateUser
  prepend SimpleCommand

  def initialize(auth_params)
    @auth_params = auth_params
  end

  def call
    user = User.new(auth_params)

    return user if user.save

    errors.add(:user, user.errors)

    nil
  end

  private

  attr_reader :auth_params
end
