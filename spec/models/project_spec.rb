# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Project, type: :model do
  context 'project attributes' do
    it 'should be invalid without any attributes' do
      expect(subject).to_not be_valid
    end

    it 'should be invalid if name less than 3 symbols' do
      subject.name = 'hi'
      expect(subject).to_not be_valid
    end

    it 'should be valid with name' do
      subject.name = 'hello work'
      expect(subject).to be_valid
    end
  end
end
