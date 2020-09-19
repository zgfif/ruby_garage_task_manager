# frozen_string_literal: true

require 'rails_helper'

RSpec.describe JsonWebToken do
  context 'correct conversion' do
    let(:payload) { { user_id: '7131' } }
    let(:date) { 7.days.from_now }

    it 'should correctly encode/decode' do
      token = described_class.encode(payload, date)
      decoded = described_class.decode(token)

      expect(decoded['user_id']).to eq(payload[:user_id])
      expect(decoded['exp']).to eq(date.to_i)
    end
  end

  context 'incorrect token' do
    let(:invalid_token) { 'some_random_data123.asdfjlakdjf.asdfaf42' }

    it 'should return nil' do
      expect(described_class.decode(invalid_token)).to be_nil
    end
  end

  context 'invalid payload' do
    let(:payload) { 'invalid_paylod' }

    it 'should rise error' do
      expect { described_class.encode(payload) }.to raise_error TypeError
    end
  end
end
