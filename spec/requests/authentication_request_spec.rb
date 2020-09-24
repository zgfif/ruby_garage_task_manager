# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Athentication endpoint', type: :request do
  before(:each) do
    user = create(:user)
    @signin_params = { email: user.email, password: '111111' }
  end

  it 'should pass signin' do
    post '/signin', params: @signin_params

    expect(response_body).to have_key('auth_token')
  end

  context 'should NOT signin' do
    it 'with invalid password' do
      @signin_params[:password] = '000000'
      post '/signin', params: @signin_params

      expect(response_body['error']['user_authentication'])
        .to eq('invalid credentials')
    end

    it 'with invalid email' do
      @signin_params[:email] = 'mail@example.com'
      post '/signin', params: @signin_params

      expect(response_body['error']['user_authentication'])
        .to eq('invalid credentials')
    end
  end
end
