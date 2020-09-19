# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthenticateUser do
  before(:example) do
    @user = create(:user)
  end

  context 'pass authentication' do
    it 'should return token' do
      token = described_class.call(@user.email, '111111').result
      expect(token).to_not be_nil
      expect(JsonWebToken.decode(token)['user_id']).to eq(@user.id)
    end
  end

  context 'NOT pass authentication' do
    it 'should return nil' do
      token = described_class.call(@user.email, '11111')
      expect(token.result).to be_nil
      expect(token.errors[:user_authentication][0])
        .to a_value('invalid credentials')
    end
  end
end
