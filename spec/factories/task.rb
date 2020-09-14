# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    sequence :name do |i|
      "My task_#{i}"
    end

    status { 0 }
    deadline { '31-09-2020' }
    priority { 0 }
  end
end
