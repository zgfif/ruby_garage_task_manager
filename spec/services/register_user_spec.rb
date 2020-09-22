# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RegistrateUser do
  let(:email) { 'mail@example.com' }
  let(:pass) { '111111' }
  let(:subject) do
    described_class.new(email: email,
                        password: pass,
                        password_confirmation: pass)
  end

  it 'should register new user' do
    command = subject.call

    expect(command.result[:email]).to eq('mail@example.com')
    expect(command.result[:id]).to_not be_nil
  end

  it 'should respond with nil and errors' do
    create(:user, email: email)
    command = subject.call

    expect(command.result).to be_nil

    expect(JSON.parse(command.errors[:user].to_json)[0]['email'])
      .to eq(['has already been taken'])
  end
end
