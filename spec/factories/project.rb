# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    sequence :name do |n|
      "Project_#{n}"
    end
  end
end
