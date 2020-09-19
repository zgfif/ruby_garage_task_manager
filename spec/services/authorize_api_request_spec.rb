# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  let(:user) { create(:user) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }
  let(:request_headers) { { 'Authorization' => token } }

  context 'correct authorization' do
    it 'should return current user' do
      auth_request = described_class.call(request_headers)

      expect(auth_request.result).to eq(user)
      expect(auth_request.errors).to be_empty
    end
  end

  context 'incorrect authorization' do
    it 'should return nil missing and invalid token errors' do
      auth_request = described_class.call

      expect(auth_request.result).to be_nil
      expect(auth_request.errors[:token])
        .to eq(['Missing token', 'Invalid token'])
    end

    it 'should return nil invalid token error' do
      auth_request = described_class.call('Authorization' => 'ajsdfk.adsfk')

      expect(auth_request.result).to be_nil
      expect(auth_request.errors[:token]).to eq(['Invalid token'])
    end
  end
end
