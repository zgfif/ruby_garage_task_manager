# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "person#{n}@example.com"
    end

    password { '111111' }
  end
end
