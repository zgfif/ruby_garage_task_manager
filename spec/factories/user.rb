# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "person#{n}@example.com"
    end

    password { '11111111' }
    password_confirmation { '11111111' }

    before(:create) do |u|
      u.skip_confirmation!
    end
  end
end
