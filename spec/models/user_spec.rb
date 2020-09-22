# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:email) { 'mail@example.com' }
  let(:password) { '111111' }

  let(:subject) do
    User.new(email: email, password: password, password_confirmation: password)
  end

  context 'user attributes' do
    it 'has valid email' do
      expect(subject).to be_valid
    end

    it 'has ivalid email' do
      subject.save
      user = build(:user, email: email)
      expect(user).to_not be_valid
    end

    it 'has no email' do
      subject.email = ''
      expect(subject).to_not be_valid
    end
  end
end
