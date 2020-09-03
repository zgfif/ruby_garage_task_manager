# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Project do
  context 'project attributes' do
    it 'should be invalid without any attributes' do
      project = Project.new
      expect(project).to_not be_valid
    end

    it 'should be invalid if name less than 3 symbols' do
      project = Project.new(name: 'hi')
      expect(project).to_not be_valid
    end

    it 'should be valid with name' do
      project = Project.new(name: 'home work')
      expect(project).to be_valid
    end

  end
end
