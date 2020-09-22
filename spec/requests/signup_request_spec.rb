# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Signup', type: :request do
  it 'should successfully signup' do
    post '/signup', params: { user: { email: 'mail@example.com', password: '111111', password_confirmation: '111111' } }

    expect(User.count).to eq(1)
    expect(response.status).to eq(201)
    expect(response_body['user']['email']).to eq('mail@example.com')
  end

  context 'unsuccessfull signups' do
    it 'no email' do
      post '/signup', params: { user: { email: '', password: '111111', password_confirmation: '111111' } }

    expect(response.status).to eq(409)
    expect(response_body['errors']['user']['email']).to eq(['can\'t be blank'])
    end

    it 'email is already taken' do
      create(:user, email: 'mail@example.com')
      post '/signup', params: { user: { email: 'mail@example.com', password: '111111', password_confirmation: '111111' } }

    expect(response.status).to eq(409)
    expect(response_body['errors']['user']['email']).to eq(['has already been taken'])
    end

    it 'has invalid password confirmation' do
      post '/signup', params: { user: { email: 'mail@example.com', password: '111111', password_confirmation: '11111' } }

      expect(response.status).to eq(409)
      expect(response_body['errors']['user']['password_confirmation']).to eq(['doesn\'t match Password'])
    end
  end
end
