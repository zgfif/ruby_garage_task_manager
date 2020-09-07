# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    name { 'My project' }
    user
  end
end
