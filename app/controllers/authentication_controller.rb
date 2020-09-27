# frozen_string_literal: true

class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(auth_params[:email], auth_params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def signup
    command = RegistrateUser.call(auth_params)
    if command.success?
      render json: { user: command.result }, status: 201
    else
      render json: { errors: command.errors }, status: :conflict
    end
  end

  private

  def auth_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
